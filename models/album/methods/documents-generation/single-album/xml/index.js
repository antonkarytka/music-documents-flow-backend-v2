const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

module.exports = ({albumId}, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.fetchById(albumId, {
      include: [
        {
          model: models.Artist,
          as: 'artist',
          include: [
            {
              model: models.Label,
              as: 'label'
            }
          ]
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
      return new Promise(resolve => resolve(
        js2xmlparser.parse('statistics', createXmlDocument(album)))
      );
    })
  });
};

function createXmlDocument(album) {
  const artistData = _.pick(album.artist, 'firstName', 'lastName', 'createdAt');
  const artistLabelData = _.pick(album.artist.label, 'name', 'createdAt');
  const albumData = _.pick(album, 'name', 'createdAt');
  const songsData = _.map(album.songs, field => _.pick(field, [
    'name', 'createdAt'
  ]));
  const salesData = _.map(album.sales, field => _.pick(field, [
    'sales', 'createdAt'
  ]));
  return {
    artist: {
      generalInfo: artistData,
      label: artistLabelData
    },
    album: albumData,
    songs: {
      song: songsData
    },
    sales: salesData
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