const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

const models = require('../../../../index');
const { sequelize } = models;

module.exports = (songId, options = {}) => {
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
      return new Promise(resolve => resolve(
        js2xmlparser.parse('statistics', createXmlDocument(song)))
      );
    })
  });
};

function createXmlDocument(song) {
  const songData = _.pick(song, 'name', 'createdAt');
  const artistsData = _.map(song.artists, artist => 
    _.pick(artist, 'firstName', 'lastName', 'createdAt'));
  const listenings = _.map(song.listeningStatistics, statistics => ({
    '@': {
      createdDate: `${statistics.createdAt}`
    },
    listenings: _.pick(statistics,
      'appleMusic', 'googlePlayMusic', 'yandexMusic', 'spotify')
  }));
  return {
    song: songData,
    artists: artistsData,
    listeningStatistics: listenings
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