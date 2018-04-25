const DOCUMENT_GENERATOR = {
  pdf: require('./pdf'),
  xml: require('./xml'),
};

module.exports = ({type, songId}, options = {}) => DOCUMENT_GENERATOR[type](songId, options);