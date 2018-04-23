const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');

const models = require('../../../../index');
const { sequelize } = models;

module.exports = (albumId, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.fetchById(albumId, {
      include: [
        {
          model: models.Artist,
          as: 'artist'
        },
        {
          model: models.Song,
          as: 'songs',
          include: [{
            model: models.Artist,
            as: 'artists'
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
      const creationDate = new Date().toLocaleDateString();

      const writer = new streams.WritableStream();
      const document = new PdfKit();
      document.pipe(writer);

      document.font('Helvetica-Bold').fontSize(25).text(`Album info: ${album.name}`, {align: 'center'}).moveDown(1);

      // Songs
      document.font('Helvetica-Bold').fontSize(20).text('Songs', {align: 'center'}).moveDown(0.5);
      document.font('Helvetica').fontSize(20).text('Full list of songs:', {align: 'left'});
      album.songs.forEach(song => document.font('Helvetica').fontSize(18).text(`- ${generateSongName({song, albumArtist: album.artist})}`, {align: 'left'}));
      document.text().moveDown(2);

      // Album Sales
      document.font('Helvetica-Bold').fontSize(20).text('Sales', {align: 'center'}).moveDown(0.5);
      album.sales.forEach(sale => document.font('Helvetica').fontSize(18).text(`- ${new Date(sale.createdAt).toLocaleString()}: ${sale.sales}`, {align: 'left'}));
      document.text().moveDown(2);

      document.font('Helvetica').fontSize(18).text(`Date: ${creationDate}`, {align: 'right'});

      document.end();

      return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
    })
  });
};


function generateSongName({song, albumArtist}) {
  const featuredArtists = song.artists.filter(songArtist => songArtist.id !== albumArtist.id);
  if (featuredArtists.length) {
    const featuredArtistsString = featuredArtists.map(artist => `${artist.firstName} ${artist.lastName}, `).join('').slice(0, -2);
    return `${song.name} (feat. ${featuredArtistsString})`;
  } else {
    return song.name;
  }
}