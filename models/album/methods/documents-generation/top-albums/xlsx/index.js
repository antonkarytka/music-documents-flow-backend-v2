const Excel = require('exceljs');
const {
  orderBy: _orderBy,
} = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

/**
 * Commented out stuff can be used to save generated file to disk.
 */

module.exports = ({albumId}, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.fetchAll({
      include: [
        {
          model: models.Artist,
          as: 'artist'
        },
        {
          model: models.AlbumSale,
          as: 'sales',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      transaction
    })
    .then(albums => {

      const workbook = new Excel.Workbook();
      
      getAlbumsGeneralInfo(workbook, albums);

      return workbook.xlsx.writeBuffer()
    })
  });
};

function getAlbumsGeneralInfo(workbook, albums) {
  const albumsSheet = workbook.addWorksheet('Album general info', {
    pageSetup: { fitToPage: true }
  });

  albumsSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Release date', key: 'releaseDate', width: 20 },
    { header: 'Artist', key: 'artist', width: 20 },
    { header: 'Artist created date', key: 'artistCreatedDate', width: 20 },
    { header: 'Total Sales', key: 'totalSales', width: 20 },
  ];

  albumsSheet.getRow(1).font = {
    bold: true
  };

  albums = _orderBy(
    albums.data.filter(album => album.sales[0]).map(album => ({...album.toJSON(), sales: album.sales[0]})),
    ['sales.sales'], ['desc']
  );

  albums.forEach(album => {
    albumsSheet.addRow({
      name: album.name,
      releaseDate: new Date(album.createdAt).toLocaleDateString(),
      artist: `${album.artist.firstName} ${album.artist.lastName}`,
      artistCreatedDate: new Date(album.artist.createdAt).toLocaleDateString(),
      totalSales: album.sales.sales
    });
  });

  setCellsProperites(albumsSheet);
}

function setCellsProperites(sheet) {
  sheet.eachRow(row => {
    row.eachCell(cell => {
      cell.alignment = {
        ...cell.alignment,
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
    });
  });
}