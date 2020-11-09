/**
 * AuthController
 *
 * @description :: Controller responsável pelo controle de autenticação
 * @author      :: Ellian Marcondes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res) {

    var userName = req.param('userName');
    var password = req.param('password');

    // delay everthing to prevent bruteforce, dos and timing attacks
    setTimeout(function() {
      if(!userName || !password) {
        return res.json(401, {err: 'Usuário e Senha requeridos'});
      }

      sails.models.user.findOne({userName: userName}, function(err, User) {
        if(!User) {
          return res.json(401, {err: 'Senha ou usuário inválidos'});
        }

        User.verifyPassword(password, function(err, valid) {
          if(err) {
            return res.json(403, {err: 'forbidden'});
          }

          if(!valid) {
            return res.json(401, {err: 'Senha ou usuário inválidos'});
          } else {
            //res.set('Access-Control-Allow-Headers','content-type,token');
            res.set('Access-Control-Allow-Headers','content-type,token');
            res.set('Access-Control-Expose-Headers','content-type,token');
            res.set('token', sails.services.tokenauth.generateToken({userId: User.id, userName: User.userName, cep: User.cep}));
            res.json({user: User});


            // register in socket if this is a socket-request
            if(req.isSocket) {
              req.socket.User = User;
            }
          }
        });
      });
    }, 200);
  },


  /**
   * attach the User to the socket using a token
   * (socket.io reconnect)
   * @param req
   * @param res
   * @returns {*}
   */
  authSocket: function(req, res) {
    if(!req.isSocket) {
      return res.json(400, 'This route is for socket connections only');
    }

    var token = req.param('token');
    if(!token) return res.json(401, 'token missing');

    sails.services.tokenauth.getUser(token, function(err, User) {
      if(err || !User) {
        return res.json(401, 'token invalid');
      }
      req.socket.User = User;
      res.json(200, User.toJSON());
    });
  },

  /**
   * "logout" for sockets
   * @param req
   * @param res
   * @returns {*}
   */
  deauthSocket: function(req, res) {
    if(!req.isSocket) {
      return res.json(400, 'This route is for socket connections only');
    }

    delete req.socket.User;
    res.json(200, 'ok');
  }
};
