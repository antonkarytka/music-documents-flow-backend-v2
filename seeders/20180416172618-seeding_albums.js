const albums  = require('./data/albums/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('albums', [
     albums.get('Stoney'),
     albums.get('Man on the moon'),
     albums.get('MY SOUL'),
     albums.get('Come around sundown'),
     albums.get('Antidotes'),
     albums.get('Total life forever'),
     albums.get('Her'),
     albums.get('Born to die'),
     albums.get('Honeymoon'),
     albums.get('Ultraviolence'),
     albums.get('channel ORANGE'),
     albums.get('LP1'),
     albums.get('I see you'),
     albums.get('xx'),
     albums.get('Rodeo'),
     albums.get('Birds In The Trap Sing McKnight'),
     albums.get('Still Striving'),
     albums.get('Toast To The Gods'),
     albums.get('Views'),
     albums.get('More life'),
     albums.get('So Far Gone'),
     albums.get('TOTAL XANARCHY'),
     albums.get('Hot'),
     albums.get('17'),
     albums.get('21XXX'),
     albums.get('Issa album'),
     albums.get('Culture'),
     albums.get('Culture II')
   ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
