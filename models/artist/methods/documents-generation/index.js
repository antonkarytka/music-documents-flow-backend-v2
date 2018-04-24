const DOCUMENT_GENERATOR = {
  pdf: require('./pdf/index')
};

module.exports = ({type, artistId}, options = {}) => DOCUMENT_GENERATOR[type](artistId, options);