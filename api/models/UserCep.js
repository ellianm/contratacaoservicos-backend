/**
 * UserCep.js
 *
 * @description :: Este model representa os CEP's que o prestador pode atuar.
 * @author      :: Ellian Marcondes
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    cep: {
      type: 'string'
    },
    user: {
      model: 'user'
    },
    cityName: {
      type: 'string'
    }
  }
};

