const albums  = require('./data/albums/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('albums', [
     albums.get('First Album'),
     albums.get('Second Album'),
     albums.get('Third Album')
   ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
