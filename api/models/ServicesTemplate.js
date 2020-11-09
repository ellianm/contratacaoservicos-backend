/**
 * ServicesTemplate.js
 *
 * @description :: Servicestemplates irá armazenar os templates para o uso dinâmico.
 * @author      :: Ellian Marcondes
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      unique: true,
      required: true
    }
  }
};

