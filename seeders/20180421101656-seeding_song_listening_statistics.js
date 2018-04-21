const song_listening_statistics  = require('./data/song-listening-statistics/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('song_listening_statistics', [
      song_listening_statistics.get('SongListeningStatistics1'),
      song_listening_statistics.get('SongListeningStatistics2'),
      song_listening_statistics.get('SongListeningStatistics3'),
      song_listening_statistics.get('SongListeningStatistics4'),
      song_listening_statistics.get('SongListeningStatistics5'),
      song_listening_statistics.get('SongListeningStatistics6'),
    ], {});
  },

  down: (queryInterface, Sequelize) => {    
  }
};
