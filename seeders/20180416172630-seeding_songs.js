const songs  = require('./data/songs/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('songs', [
     songs.get('First Song'),
     songs.get('Second Song'),
     songs.get('Third Song'),
     songs.get('Fourth Song'),
   ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
