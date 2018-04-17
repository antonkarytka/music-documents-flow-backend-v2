const artists  = require('./data/artists/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('artists', [
    artists.get('First Artist'),
    artists.get('Second Artist'),
    artists.get('Third Artist')], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
