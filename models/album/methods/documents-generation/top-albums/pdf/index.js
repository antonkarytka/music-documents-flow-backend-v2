const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');
const { orderBy: _orderBy } = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

const dejaVuSansPath = `public/fonts/DejaVuSans.ttf`;

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
        albums.data.filter(album => album.sales[0]).map(album => ({...album.toJSON(), sales: album.sales[0]})),
        ['sales.sales'], ['desc']
      ).slice(0, 15);

      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);
      document.registerFont('DejaVuSans', dejaVuSansPath);

      document.font('DejaVuSans').fontSize(25).text(`Best Selling Albums Ever`, {align: 'center'}).moveDown(1);

      // Albums
      albums.forEach(album => document.font('DejaVuSans').fontSize(18).text(`- ${generateAlbumName(album)}`, {align: 'left'}));
      document.text().moveDown(2);

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


function generateAlbumName(album) {
  return `${album.name} (${album.artist.firstName} ${album.artist.lastName}), ${album.sales && album.sales.sales ? `sold ${album.sales.sales} times`: `no sales`}.`;
}