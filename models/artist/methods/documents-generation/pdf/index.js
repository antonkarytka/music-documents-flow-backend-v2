const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');

const models = require('../../../../index');
const { sequelize } = models;

module.exports = (artistId, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Artist.fetchById(artistId, {
      include: [
        {
          model: models.Label,
          as: 'label'
        },
        {
          model: models.Song,
          as: 'songs',
          through: {attributes: []}, // remove junction table from result
          include: [{
            model: models.Album,
            as: 'album'
          }]
        }
      ],
      transaction
    })
    .then(artist => {
      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);

      document.font('Helvetica-Bold').fontSize(25).text(`Artist info: ${artist.firstName} ${artist.lastName}`, {align: 'center'}).moveDown(1);

      // Label
      document.font('Helvetica-Bold').fontSize(20).text('Label', {align: 'center'}).moveDown(0.5);
      artist.label
      ? document.font('Helvetica').fontSize(18).text(`${artist.firstName} ${artist.lastName} currently belongs to a label called ${artist.label.name}.`, {align: 'left'}).moveDown(2)
      : document.font('Helvetica').fontSize(18).text(`${artist.firstName} ${artist.lastName} currently doesn't belong to a label.`, {align: 'left'}).moveDown(2);

      // Songs
      document.font('Helvetica-Bold').fontSize(20).text('Songs', {align: 'center'}).moveDown(0.5);
      document.font('Helvetica').fontSize(18).text(`Artist's songs are listed below. Song's album is defined in parentheses.`, {align: 'left'}).moveDown(0.5);
      artist.songs.forEach(song => document.font('Helvetica').fontSize(18).text(`- ${song.name} (${song.album.name})`, {align: 'left'}));
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
