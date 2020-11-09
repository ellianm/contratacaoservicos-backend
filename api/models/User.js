// models/user.js
/**
* user.js
* @docs        :: http://sailsjs.org/#!documentation/models
  @author      :: Ellian Marcondes
*/

var bcrypt = require('bcrypt');

module.exports = {

  schema: false,

  labels: {
    name: {
      title: "Nome Completo"
    },
    userName: {
      title: "UserName"
    },
    password: {
      title: "Password"
    },
    email: {
      title: "Email"
    },
    cep: {
      title: "CEP"
    },
    uf: {
      title: "UF"
    },
    cidade: {
      title: "Cidade"
    },
    rua: {
      title: "Nome da Rua"
    },
    numero: {
      title: "Número da Rua"
    },
    rg: {
      title: "Registro Geral"
    },
    sexo: {
      title: "Sexo"
    },
    dtNascimento: {
      title: "Data de Nascimento"
    },
    funcao: {
      title: "Função"
    },
    bairro: {
      title: "Bairro"
    },
    cnpjf: {
      title: "CPF/CNPJ"
    },
    avatarUrl: {
      title: "Imagem de perfil"
    },
    rate: {
      title: "Média de avaliação"
    }
  },
  types: {
    password: function (password) {
      return password;
    }
  },

  attributes: {
    name: {
      type: 'string'
    },
    userName: {
      type: 'string',
      required: true,
      unique: true,
      minLength: 3
    },
    password: {
      type: 'string',
      password: true,
      minLength: 5,
      required: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    cep: {
      type: 'string'
    },
    uf: {
      type: 'string',
      maxLength: 2
    },
    cidade: {
      type: 'string'
    },
    rua: {
      type: 'string'
    },
    numero: {
      type: 'string'
    },
    rg: {
      type: 'string'
    },
    cnpjf: {
      type: 'string'
    },
    sexo: {
      type: 'string'
    },
    dtNascimento: {
      type: 'string'
    },
    funcao: {
      type: 'string'
    },
    bairro: {
      type: 'string'
    },
    telefone: {
      type: 'string'
    },
    isPrestador: {
      type: 'boolean'
    },
    avatarUrl: {
      type: 'string'
    },
    avatarFd: {
      type: 'string'
    },
    rate: {
      type: 'float'
    },
    jobList: {
      collection: 'userJob',
      via: 'user'
    },
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    },

    verifyPassword: function (password, cb) {
      return bcrypt.compare(password, this.password, cb);
    }

  },


  beforeCreate: function (data, cb) {
    bcrypt.hash(data.password, 6, function (err, hash) {
      data.password = hash;
      delete data.passwordConfirm;
      cb();
    });

  },

  beforeUpdate: function (data, cb) {
    if (data.password) {
      bcrypt.hash(data.password, 6, function (err, hash) {
        data.password = hash;
        delete data.passwordConfirm;
        cb();
      });
    } else {
      return cb();
    }
  }

};
