/**
 * ServicesContract.js
 *
 * @description :: ServicesContract irá armazenar os dados referentes ao contrato estabelecido pelo prestador e o contratante
 * @author      :: Ellian Marcondes
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    serviceName: {
      type: 'string',
      required: 'true'
    },
    dtConclusion: {
      type: 'string'
    },
    dtSolicitation: {
      type: 'string'
    },
    observation: {
      type: 'text'
    },
    avaliation: {
      type: 'string',
      defaultsTo:'0'
    },
    avaliationObs: {
      type: 'string'
    },
    action: {
      type: 'boolean'
    },
    value: {
      type: 'float'
    },
    provider: {
      model: 'user'
    },
    client: {
      model: 'user'
    },
    object: {
      type: 'json'
    }
  }
};

