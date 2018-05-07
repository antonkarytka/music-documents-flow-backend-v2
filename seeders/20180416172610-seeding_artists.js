const artists  = require('./data/artists/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('artists', [
    artists.get('Postmalone'),
    artists.get('Kid cudi'),
    artists.get('Lizer'),
    artists.get('Kings of leon'),
    artists.get('Foals'),
    artists.get('Her'),
    artists.get('Lana del rey'),
    artists.get('Frank Ocean'),
    artists.get('FKA Twigs'),
    artists.get('The xx'),
    artists.get('Travis Scott'),
    artists.get('ASAP Ferg'),
    artists.get('Drake'),
    artists.get('Lil Xan'),
    artists.get('XXXTENTACION'),
    artists.get('21 Savage'),
    artists.get('Migos')], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
