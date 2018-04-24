const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

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
      // console.log(js2xmlparser('statistics', _.pick(album, [
      //   ''
      // ])))
      // const data = [
      //   album.artist.firstName, album.artist.lastName, album.name
      // ];
      // const data = _.map(album, field => _.pick(field, [
      //   'firstName', 'lastName', 'createdAt', 'name', 'aritst.name'
      // ]));
      // const data = _.map(album.artist, field => _.pick(field, [
      //   'firstName', 'lastName'
      // ]));
      const data = _.map(album.songs, field => ({"song": _.pick(field, [
        'name', 'createdAt'
      ])}));
      const data2 = _.map(album.sales, field => _.pick(field, [
        'sales', 'createdAt'
      ]));
      console.log(data);
      return new Promise(resolve => resolve(js2xmlparser.parse('statistics', [data, data2])));
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