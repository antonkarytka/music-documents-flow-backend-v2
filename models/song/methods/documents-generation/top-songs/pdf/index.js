const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');
const {
  reduce: _reduce,
  orderBy: _orderBy
} = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

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
      songs = _orderBy(songs, ['listeningStatistics.total'], ['desc']).slice(0, 15);

      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);

      document.font('Helvetica-Bold').fontSize(25).text(`Most Popular Songs Ever`, {align: 'center'}).moveDown(1);

      // Songs
      songs.forEach((song, index) => document.font('Helvetica').fontSize(18).text(`${index + 1}) ${generateSongName(song)}`, {align: 'left'}).moveDown(0.5));
      document.text().moveDown(2);

      document.font('Helvetica').fontSize(18).text(`Date: ${creationDate}`, {align: 'right'}).moveDown(2);

      document.image(
        `${process.cwd()}/public/images/ktk-icon.png`,
        document.page.width - 222, // image's width + document's margin = 150 + 72
        undefined,
        {fit: [150, 150]}
      );
      document.moveDown(0.3);
      document.font('Helvetica').fontSize(16).text(`Sincerely yours, KTK team.`, {align: 'right'}).moveDown(1);

      document.end();

      return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
    })
  });
};


function generateSongName(song) {
  const artists = song.artists.map(artist => `${artist.firstName} ${artist.lastName} & `).join('').slice(0, -2);
  return `${song.name}: produced by ${artists}, total listening count is ${song.listeningStatistics.total}`;
}