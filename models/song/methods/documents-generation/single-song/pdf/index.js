const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');

const models = require('../../../../../index');
const { sequelize } = models;

const dejaVuSansPath = `public/fonts/DejaVuSans.ttf`;

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
      document.registerFont('DejaVuSans', dejaVuSansPath);

      document.font('DejaVuSans').fontSize(25).text(`Song info: ${song.name}`, {align: 'center'}).moveDown(1);

      // Artists
      document.font('DejaVuSans').fontSize(20).text('Artists', {align: 'center'}).moveDown(0.5);
      document.font('DejaVuSans').fontSize(20).text('Full list of artists featured in this song:', {align: 'left'});
      song.artists.forEach(artist => document.font('DejaVuSans').fontSize(18).text(`- ${artist.firstName} ${artist.lastName}`, {align: 'left'}));
      document.text().moveDown(2);

      // Album
      document.font('DejaVuSans').fontSize(20).text('Album', {align: 'center'}).moveDown(0.5);
      song.album
      ? document.font('DejaVuSans').fontSize(18).text(`This song is a part of ${song.album.name} album released on ${new Date(song.album.createdAt).toLocaleDateString()}`, {align: 'left'})
      : document.font('DejaVuSans').fontSize(18).text(`This song doesn't belong to any albums yet. This is just a single`, {align: 'left'});
      document.text().moveDown(2);

      // Listening Statistics
      document.font('DejaVuSans').fontSize(20).text('Listening Statistics', {align: 'center'}).moveDown(0.5);
      song.listeningStatistics.forEach(statisticsItem => document.font('DejaVuSans').fontSize(18).text(`- ${new Date(statisticsItem.createdAt).toLocaleString()}: Apple Music (${statisticsItem.appleMusic}), Google Play Music (${statisticsItem.googlePlayMusic}), Spotify: (${statisticsItem.spotify}), Yandex Music (${statisticsItem.yandexMusic})`, {align: 'left'}).moveDown(0.5));
      document.moveDown(1);


      document.font('DejaVuSans').fontSize(18).text(`Date: ${creationDate}`, {align: 'right'}).moveDown(2);

      document.image(
        `${process.cwd()}/public/images/ktk-icon.jpg`,
        document.page.width - 222, // image's width + document's margin = 150 + 72
        undefined,
        {fit: [150, 150]}
      );
      document.moveDown(0.3);
      document.font('DejaVuSans').fontSize(16).text(`Sincerely yours, KTK team.`, {align: 'right'}).moveDown(1);

      document.end();

      return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
    })
  });
};
