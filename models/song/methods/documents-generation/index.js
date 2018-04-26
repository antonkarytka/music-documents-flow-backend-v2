const DOCUMENT_GENERATOR = {
  singleSong: require('./single-song'),
  topSongs: require('./top-songs')
};

module.exports = ({generatorType, documentType, songId}, options = {}) =>
  DOCUMENT_GENERATOR[generatorType][documentType]({songId}, options);