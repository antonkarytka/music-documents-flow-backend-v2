const DOCUMENT_GENERATOR = {
  singleAlbum: require('./single-album'),
  topAlbums: require('./top-albums')
};

module.exports = ({generatorType, documentType, albumId}, options = {}) =>
  DOCUMENT_GENERATOR[generatorType][documentType]({albumId}, options);