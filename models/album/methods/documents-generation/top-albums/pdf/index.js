const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');
const { orderBy: _orderBy } = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

module.exports = (content, options = {}) => {
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
      albums = _orderBy(
        albums.data.map(album => ({...album.toJSON(), sales: album.sales[0]})),
        ['sales.sales'], ['desc']
      ).slice(0, 15);

      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);

      document.font('Helvetica-Bold').fontSize(25).text(`Best Selling Albums Ever`, {align: 'center'}).moveDown(1);

      // Albums
      albums.forEach(album => document.font('Helvetica').fontSize(18).text(`- ${generateAlbumName(album)}`, {align: 'left'}));
      document.text().moveDown(2);

      document.font('Helvetica').fontSize(18).text(`Date: ${creationDate}`, {align: 'right'});

      document.end();

      return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
    })
  });
};


function generateAlbumName(album) {
  return `${album.name}: produced by ${album.artist.firstName} ${album.artist.lastName}, sold ${album.sales.sales} times`;
}