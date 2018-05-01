const Excel = require('exceljs');
const {
  reduce: _reduce,
  orderBy: _orderBy
} = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

/**
 * Commented out stuff can be used to save generated file to disk.
 */

module.exports = ({albumId}, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.fetchById(albumId, {
      include: [
        {
          model: models.Artist,
          as: 'artist',
          include: [
            {
              model: models.Label,
              as: 'label'
            }
          ]
        },
        {
          model: models.Song,
          as: 'songs',
          include: [{
            model: models.Artist,
            as: 'artists',
            through: {attributes: []} // remove junction table from result
          }]
        },
        {
          model: models.AlbumSale,
          as: 'sales',
          limit: 15,
          order: [['createdAt', 'DESC']]
        }
      ],
      transaction
    })
    .then(album => {

      const workbook = new Excel.Workbook();
      
      getAlbumGeneralInfoSheet(workbook, album);
      getSongsSheet(workbook, album.songs);
      getSalesSheet(workbook, album.sales);

      return workbook.xlsx.writeBuffer()
    })
  });
};

function getSongsSheet(workbook, songs) {
  const songsSheet = workbook.addWorksheet('Album songs', {
    pageSetup: { fitToPage: true }
  });

  songsSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Release date', key: 'releaseDate', width: 20 },
  ];

  songsSheet.getRow(1).font = {
    bold: true
  };

  songs.forEach(song => {
    songsSheet.addRow({
      name: song.name,
      releaseDate: new Date(song.createdAt).toLocaleDateString(),
    });
  });

  setCellsProperites(songsSheet);
}

function getAlbumGeneralInfoSheet(workbook, album) {
  const albumSheet = workbook.addWorksheet('Album general info', {
    pageSetup: { fitToPage: true }
  });

  albumSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Artist', key: 'artist', width: 20 },
    { header: 'Artist\'s label', key: 'artistLabel', width: 20 },
    { header: 'Release Date', key: 'releaseDate', width: 20 },
  ];

  albumSheet.getRow(1).font = {
    bold: true
  };

  albumSheet.addRow({
    name: album.name,
    releaseDate: new Date(album.createdAt).toLocaleDateString(),
    artist: `${album.artist.firstName} ${album.artist.lastName}`,
    artistLabel: album.artist.label && album.artist.label.name,
  });

  setCellsProperites(albumSheet);
}

function getSalesSheet(workbook, sales) {
  const salesSheet = workbook.addWorksheet('Sales', {
    pageSetup: { fitToPage: true }
  });

  salesSheet.columns = [
    { header: 'Sales', key: 'sales', width: 20 },
    { header: 'Date', key: 'date', width: 20 },
  ];

  salesSheet.getRow(1).font = {
    bold: true
  };

  sales.forEach(sale => {
    salesSheet.addRow({
      sales: sale.sales,
      date: new Date(sale.createdAt).toLocaleDateString(),
    });
  });

  setCellsProperites(salesSheet);
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