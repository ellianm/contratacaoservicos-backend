/**
 * ServicesContractController
 *
 * @description :: Controller para manutenção de usuário e controle do avatar
 * @author      :: Ellian Marcondes
*/

module.exports = {
  existsUserName: function (req, res) {
    var userName = req.param('userName');
    sails.models.user.findOne({ userName: userName }, function (err, User) {
      if (!User) {
        return res.json(200, { userNameTaken: false });
      } else {
        return res.json(200, { userNameTaken: true });
      }
    });
  },
  existsEmail: function (req, res) {
    var email = req.param('email');
    sails.models.user.findOne({ email }, function (err, User) {
      if (!User) {
        return res.json(200, { emailTaken: false });
      } else {
        return res.json(200, { emailTaken: true });
      }
    });
  },
  upload: function (req, res) {
    req.file('avatar').upload({
      maxBytes: 10000000
    }, function whenDone(err, uploadedFiles) {
      if (err) {
        return res.serverError(err);
      }
      if (uploadedFiles.length === 0) {
        return res.badRequest('No file was uploaded');
      }
      var baseUrl = sails.config.appUrl;
      User.update(req.param('id'), {
        avatarUrl: require('util').format('%s/user/avatar/%s', baseUrl, req.param('id')),
        avatarFd: '.tmp/uploads/' + uploadedFiles[0].fd
      }).exec(function (err) {
        if (err) return res.serverError(err);
        return res.ok();
      });
    });
  },
  avatar: function (req, res) {
    User.findOne(req.param('id')).exec(function (err, user) {
      if (err) return res.serverError(err);
      if (!user) return res.notFound();

      if (!user.avatarFd) {
        return res.notFound();
      }
      var SkipperDisk = require('skipper-disk');
      var fileAdapter = SkipperDisk();
      fileAdapter.read(user.avatarFd)
        .on('error', function (err) {
          return res.serverError(err);
        })
        .pipe(res);
    });
  },
  badge: function (req, res) {
    const user = req.param('id');
    User.findOne({ id: user }, async function (err, user) {
      if (err) return res.serverError();
      if (!user) return res.json(404, { err: 'Não tem pendências para o usuário' });
      let pendingAvaliation = await ServicesContract.find({ client: user.id, avaliation: 0, dtConclusion: { '!': null } });
      let pendingJobs = await ServicesContract.find({ provider: user.id, dtConclusion: null });
      let countBadge = 0;
      if (pendingAvaliation.length) countBadge = countBadge + pendingAvaliation.length;
      if (pendingJobs.length) countBadge = countBadge + pendingJobs.length;
      if (countBadge) return res.json(200, { countBadge });
      return res.json(200, { countBadge: null });
    });
  }
}
