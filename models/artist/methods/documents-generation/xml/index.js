const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

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
      return new Promise(resolve => resolve(
        js2xmlparser.parse('statistics', createXmlDocument(artist)))
      );
    })
  });
};

function createXmlDocument(artist) {
  const artistData = _.pick(artist, 'firstName', 'lastName', 'createdAt');
  const labelData = _.pick(artist.label, 'name', 'createdAt');
  const songsData = _.map(artist.songs, field => ({
    song: _.pick(field, ['name', 'createdAt']),
    album: _.pick(field.album, ['name', 'createdAt'])
  }));
  return {
    artist: artistData,
    label: labelData,
    songs: {
      song: songsData
    }
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