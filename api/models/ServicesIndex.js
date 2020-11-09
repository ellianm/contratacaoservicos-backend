/**
 * ServicesIndex.js
 *
 * @description :: Este model representa o index de serviços. Ex: pesquisa de Construtor irá apontar para o template de Pedreiro
 * @author      :: Ellian Marcondes
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    searchKey: {
      type: 'string'
    },
    value: {
      type: 'string'
    }
  }
};

