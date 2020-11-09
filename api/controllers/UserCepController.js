/**
 * UserCepController
 *
 * @description :: Server-side logic for managing Userceps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */



module.exports = {
  user: function (req, res) {
    const user = req.param('id');
    UserCep.find({ user: user }, function (err, ceps) {
      if (err) return res.serverError(err);
      if (!ceps) return res.json(404, 'Não existem Ceps configurados para este usuário!');
      return res.json(200, ceps);
    });
  },
  searchCep: async function (req, res) {
    let cep = require('cep-promise');
    const serviceName = req.param('serviceName');
    let city;
    await cep(req.param('cep'))
      .then(cepReturn => city = cepReturn.city + ' - ' + cepReturn.state,
        err => res.json(400, { err: 'Formato de CEP inválido!' }));
    ServicesIndex.findOne({ searchKey: serviceName }, function (err, servicesIndex) {
      if (err) return res.serverError();
      if (!servicesIndex) {
        UserJob
          .find({ jobName: serviceName })
          .populate('user')
          .exec(async function (err, user) {
            if (err) return res.serverError();
            if (!user.length) return res.json(404, { err: 'Não foram encontrados prestadores' });

            for (let u in user) {
              let userCep = await UserCep.findOne({ cityName: city, user: user[u].user.id });
              if (!userCep) {
                user.splice(u);
                continue;
              }
              let userAvaliations = await ServicesContract.find(
                {
                  provider: user[u].user.id,
                  avaliation: { '>': 0 },
                  serviceName: user[u].jobName
                });
              let rate = 0;
              let total = 0;
              if (userAvaliations.length) {
                for (avaliation in userAvaliations) {
                  total = total + parseFloat(userAvaliations[avaliation].avaliation);
                }
                rate = total / userAvaliations.length;
                user[u].rate = rate.toFixed(1);
              } else {
                user[u].rate = "Sem Avaliações";
              }
            }
            return res.json(200, user);
          });
      } else {
        ServicesIndex.find({ value: servicesIndex.value }, async function (err, servicesIndexReturn) {
          if (err) return res.serverError();
          if (!servicesIndexReturn) return res.json(404, { err: 'Não foram encontrados prestadores' });
          let userSearch = [];
          for (let serviceIndex in servicesIndexReturn) {
            let userService = await UserJob.find({ jobName: servicesIndexReturn[serviceIndex].searchKey }).populate('user');
            for (let userIndex in userService) {
              let userCep = await UserCep.findOne({ cityName: city, user: userService[userIndex].user.id });

              if (!userCep) userService.splice(userIndex);
            }
            userSearch = userSearch.concat(userService);
          }
          if (!userSearch.length) return res.json(404, { err: 'Não foram encontrados prestadores' });
          for (let user in userSearch) {
            let userAvaliations = await ServicesContract.find({
              provider: userSearch[user].user.id,
              avaliation: { '>': 0 },
              serviceName: userSearch[user].jobName
            });
            let rate = 0;
            let total = 0;
            if (userAvaliations.length) {
              for (avaliation in userAvaliations) {
                total = total + parseFloat(userAvaliations[avaliation].avaliation);
              }
              rate = total / userAvaliations.length;
              userSearch[user].rate = rate.toFixed(1);
            } else {
              userSearch[user].rate = "Sem Avaliações";
            }
            userSearch[user].value = null;
          }
          return res.json(200, userSearch);
        });
      }
    });
  }
};

