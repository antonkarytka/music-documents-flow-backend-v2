const album_sales  = require('./data/album-sales/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('album_sales', [
      album_sales.get('AlbumSales1'),
      album_sales.get('AlbumSales2'),
      album_sales.get('AlbumSales3'),
      album_sales.get('AlbumSales4'),
      album_sales.get('AlbumSales5'),
      album_sales.get('AlbumSales6'),
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
