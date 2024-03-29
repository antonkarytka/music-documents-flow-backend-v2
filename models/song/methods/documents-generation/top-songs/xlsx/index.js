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

module.exports = (content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.fetchAll({
      include: [
        {
          model: models.Artist,
          as: 'artists',
          through: {attributes: []} // remove junction table from result
        },
        {
          model: models.SongListeningStatistics,
          as: 'listeningStatistics',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      transaction
    })
    .then(songs => {
      songs = _reduce(songs.data, (songs, song) => {
        song = song.toJSON();
        const { appleMusic, googlePlayMusic, spotify, yandexMusic } = song.listeningStatistics[0] || {};
        songs.push({
          ...song,
          listeningStatistics: {
            ...song.listeningStatistics[0],
            total: appleMusic + googlePlayMusic + spotify + yandexMusic || 0
          }
        });
        return songs;
      }, []);
      songs = _orderBy(songs, ['listeningStatistics.total'], ['desc']).slice(0, 50);

      // const options = {
      //   filename: 'out.xlsx',
      //   useStyles: true,
      //   useSharedStrings: true
      // };
      // const workbook = new Excel.stream.xlsx.WorkbookWriter(options);

      const workbook = new Excel.Workbook();
      const sheet = workbook.addWorksheet('Top Songs', {
        pageSetup: { fitToPage: true }
      });

      sheet.columns = [
        { header: 'Name', key: 'name', width: 20 },
        { header: 'Artists', key: 'artists', width: 20 },
        { header: 'Apple Music', key: 'appleMusic', width: 20 },
        { header: 'Google Play Music', key: 'googlePlayMusic', width: 20 },
        { header: 'Spotify', key: 'spotify', width: 20 },
        { header: 'Yandex Music', key: 'yandexMusic', width: 20 },
        { header: 'Release Date', key: 'releaseDate', width: 20 },
      ];

      sheet.getRow(1).font = { bold: true };

      songs.forEach(song => {
        sheet.addRow({
          name: song.name,
          artists: song.artists.map(artist => `${artist.firstName} ${artist.lastName} & `).join('').slice(0, -2),
          appleMusic: song.listeningStatistics.appleMusic,
          googlePlayMusic: song.listeningStatistics.googlePlayMusic,
          spotify: song.listeningStatistics.spotify,
          yandexMusic: song.listeningStatistics.yandexMusic,
          releaseDate: new Date(song.createdAt).toLocaleDateString()
        })
      });

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

      // return workbook.commit()
      // .then(() => true)

      return workbook.xlsx.writeBuffer()
    })
  });
};