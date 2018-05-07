const Promise = require('bluebird');
var js2xmlparser = require("js2xmlparser");
var _ = require('lodash');

const models = require('../../../../../index');
const { sequelize } = models;

module.exports = (songId, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.fetchAll({
      include: [
        {
          model: models.Artist,
          as: 'artists',
          through: {attributes: []} // remove junction table from result
        },
        {
          model: models.SongListeningStatistics,
          as: 'listeningStatistics',
          limit: 1,
          order: [['createdAt', 'DESC']]
        }
      ],
      transaction
    })
    .then(songs => {
      songs = _.reduce(songs.data, (songs, song) => {
        song = song.toJSON();
        const { appleMusic, googlePlayMusic, spotify, yandexMusic } = song.listeningStatistics[0] || {};
        songs.push({
          ...song,
          listeningStatistics: {
            ...song.listeningStatistics[0],
            total: Number(appleMusic) + Number(googlePlayMusic) +
              Number(spotify) + Number(yandexMusic) || 0
          }
        });
        return songs;
      }, []);
      songs = _.orderBy(songs, ['listeningStatistics.total'], ['desc']);
      console.log(songs);
      return new Promise(resolve => resolve(
        js2xmlparser.parse('statistics', createXmlDocument(songs)))
      );
    })
  });
};

function createXmlDocument(songs) {
  const songsData = _.map(songs, song => ({
    songInfo: _.pick(song, 'name', 'createdAt', 'updatedAt'),
    artists: _.map(song.artists, artist => _.pick(artist, 'firstName', 'lastName', 'createdAt')),
    listeningStatistics: _.pick(song.listeningStatistics, 
      'appleMusic', 'googlePlayMusic', 'yandexMusic', 'spotify', 'total')
  }));
  return {
    songs: songsData
  };
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