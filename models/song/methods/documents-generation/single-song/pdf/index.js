const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');

const models = require('../../../../../index');
const { sequelize } = models;

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
      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);

      document.font('Helvetica-Bold').fontSize(25).text(`Song info: ${song.name}`, {align: 'center'}).moveDown(1);

      // Artists
      document.font('Helvetica-Bold').fontSize(20).text('Artists', {align: 'center'}).moveDown(0.5);
      document.font('Helvetica').fontSize(20).text('Full list of artists featured in this song:', {align: 'left'});
      song.artists.forEach(artist => document.font('Helvetica').fontSize(18).text(`- ${artist.firstName} ${artist.lastName}`, {align: 'left'}));
      document.text().moveDown(2);

      // Album
      document.font('Helvetica-Bold').fontSize(20).text('Album', {align: 'center'}).moveDown(0.5);
      song.album
      ? document.font('Helvetica').fontSize(18).text(`This song is a part of ${song.album.name} album released on ${new Date(song.album.createdAt).toLocaleDateString()}`, {align: 'left'})
      : document.font('Helvetica').fontSize(18).text(`This song doesn't belong to any albums yet. This is just a single`, {align: 'left'});
      document.text().moveDown(2);

      // Listening Statistics
      document.font('Helvetica-Bold').fontSize(20).text('Listening Statistics', {align: 'center'}).moveDown(0.5);
      song.listeningStatistics.forEach(statisticsItem => document.font('Helvetica').fontSize(18).text(`- ${new Date(statisticsItem.createdAt).toLocaleString()}: Apple Music (${statisticsItem.appleMusic}), Google Play Music (${statisticsItem.googlePlayMusic}), Spotify: (${statisticsItem.spotify}), Yandex Music (${statisticsItem.yandexMusic})`, {align: 'left'}).moveDown(0.5));
      document.text().moveDown(2);


      document.font('Helvetica').fontSize(18).text(`Date: ${creationDate}`, {align: 'right'});

      document.end();

      return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
    })
  });
};
