/**
 * ConfigMaid.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    smallSize: {
      type: 'float'
    }, 
    mediumSize:{
      type: 'float'
    },
    largeSize:{
      type: 'float'
    },
    smallValue:{
      type: 'float'
    },
    mediumValue:{
      type: 'float'
    },
    largeValue:{
      type: 'float'
    },
    cleaningLight:{
      type: 'float'
    }, 
    cleaningNormal:{
      type: 'float'
    }, 
    cleaningHeavy:{
      type: 'float'
    },
    user: {
      model: 'user'
    }
  }
};

