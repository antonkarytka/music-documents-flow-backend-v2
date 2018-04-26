const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

module.exports = (albumId, options = {}) => {
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
      albums = _.orderBy(albums.data.map(album => ({...album.toJSON(), sales: album.sales[0]})), ['sales.sales'], ['desc']);
      return new Promise(resolve => resolve(
        js2xmlparser.parse('statistics', createXmlDocument(albums)))
      );
    })
  });
};

function createXmlDocument(albums) {
  console.log(albums);
  const albumsInfo = _.map(albums, album => ({
    albumInfo: _.pick(album, 
      'name', 'createdAt'
    ),
    artist: _.pick(album.artist,
      'firstName', 'lastName', 'createdAt'
    ),
    sales: _.pick(album.sales,
      'sales', 'createdAt'
    )
  }));
  return {
    albums: albumsInfo
  }
}


function generateSongName({song, albumArtist}) {
  const featuredArtists = song.artists.filter(songArtist => songArtist.id !== albumArtist.id);
  if (featuredArtists.length) {
    const featuredArtistsString = featuredArtists.map(artist => `${artist.firstName} ${artist.lastName}, `).join('').slice(0, -2);
    return `${song.name} (feat. ${featuredArtistsString})`;
  } else {
    return song.name;
  }
}