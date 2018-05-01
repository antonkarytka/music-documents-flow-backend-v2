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

module.exports = ({songId}, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.fetchById(songId, {
      include: [
        {
          model: models.Artist,
          as: 'artists',
          through: {attributes: []}
        },
        {
          model: models.Album,
          as: 'album'
        },
        {
          model: models.SongListeningStatistics,
          as: 'listeningStatistics',
          limit: 15,
          order: [['createdAt', 'DESC']]
        }
      ],
      transaction
    })
    .then(song => {

      const workbook = new Excel.Workbook();

      getSongGeneralInfoSheet(workbook, song);
      getArtistsSheet(workbook, song.artists);
      getListeningStatisticsSheet(workbook, song.listeningStatistics);
      // return workbook.commit()
      // .then(() => true)

      return workbook.xlsx.writeBuffer()
    })
  });
};


function getSongGeneralInfoSheet(workbook, song) {
  const songsSheet = workbook.addWorksheet('Song general info', {
    pageSetup: { fitToPage: true }
  });

  songsSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Release date', key: 'releaseDate', width: 20 },
  ];

  songsSheet.getRow(1).font = {
    bold: true
  };

  songsSheet.addRow({
    name: song.name,
    releaseDate: song.createdAt,
  });

  setCellsProperites(songsSheet);
}

function getArtistsSheet(workbook, artists) {
  const artistsSheet = workbook.addWorksheet('Artists', {
    pageSetup: { fitToPage: true }
  });

  artistsSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Artist\'s creation date', key: 'artistDate', width: 20 },
  ];

  artistsSheet.getRow(1).font = {
    bold: true
  };

  artists.forEach(artist => {
    artistsSheet.addRow({
      name: `${artist.firstName} ${artist.lastName}`,
      artistDate: artist.createdAt,
    });
  });  

  setCellsProperites(artistsSheet);
}

function getListeningStatisticsSheet(workbook, statistics) {
  const statisticsSheet = workbook.addWorksheet('Listening statistics', {
    pageSetup: { fitToPage: true }
  });

  statisticsSheet.columns = [
    { header: 'Apple Music', key: 'appleMusic', width: 20 },
    { header: 'Google Play Music', key: 'googlePlayMusic', width: 20 },
    { header: 'Spotify', key: 'spotify', width: 20 },
    { header: 'Yandex Music', key: 'yandexMusic', width: 20 },
    { header: 'Date', key: 'date', width: 20 },
  ];

  statisticsSheet.getRow(1).font = {
    bold: true
  };

  statistics.forEach(item => {
    statisticsSheet.addRow({
      appleMusic: item.appleMusic,
      googlePlayMusic: item.googlePlayMusic,
      spotify: item.spotify,
      yandexMusic: item.yandexMusic,
      date: item.createdAt
    })
  })  

  setCellsProperites(statisticsSheet);
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