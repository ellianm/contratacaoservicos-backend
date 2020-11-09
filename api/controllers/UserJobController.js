/**
 * UserJobController
 *
 * @description :: Server-side logic for managing Userjobs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  user: function (req, res) {
    const user = req.param('id');
    UserJob
      .find({ user: user })
      .populate('user')
      .exec(function (err, jobs) {
        if (err) return res.serverError(err);
        if (!jobs) return res.json(404, { err: 'Não existem Ceps configurados para este usuário!' });
        return res.json(200, jobs);
      });
  }
};

