const artist_songs  = require('./data/artist_songs/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('artist_songs', [
     artist_songs.get('Song1Artist1'),
     artist_songs.get('Song2Artist2'),
     artist_songs.get('Song1Artist2'),
     artist_songs.get('Song3Artist3'),
     artist_songs.get('Song4Artist3'),
  ], {})
  },

  down: (queryInterface, Sequelize) => {
  }
};
