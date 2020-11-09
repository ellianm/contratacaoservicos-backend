/**
 * ConfigMaidController
 *
 * @description :: Server-side logic for managing configmaids
 * @author      :: Ellian Marcondes 
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  user: function (req, res) {
    const user = req.param('id');
    ConfigMaid.find({ user: user }, function (err, config) {
      if (err) return res.serverError(err);
      if (!config.length) return res.json(404, { err: 'Não existem configurações de serviços domésticos para este usuário!' });
      return res.json(200, config);
    });
  },
  getValues: async function (req, res) {
    const rooms = req.param('rooms')
    const users = req.param('users')
    const days = req.param('days')
    let result = [];
    for (let u in users) {
      let total = 0;
      let config = await ConfigMaid.findOne({
        user: users[u].user.id
      });
      if (config) {
        for (let room in rooms) {
          let value = 0;
          if (room.length <= config.smallSize) value = config.smallValue;
          else if (room.length <= config.mediumSize) value = config.mediumValue;
          else value = config.largeValue;

          if (rooms[room].cleaningType == '0') value *= config.cleaningLight;
          else if (rooms[room].cleaningType == '1') value *= config.cleaningNormal;
          else if (rooms[room].cleaningType == '2') value *= config.cleaningHeavy;
          total += (value * days);
        };
        result.push({
          userId: users[u].user.id,
          value: total
        });
      } else {
        result.push({
          userId: users[u].user.id,
          value: null
        });
      }
    }
    return res.json(200, result);
  }
};

