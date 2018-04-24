const DOCUMENT_GENERATOR = {
  pdf: require('./pdf'),
  xml: require('./xml'),
};

module.exports = ({type, albumId}, options = {}) => DOCUMENT_GENERATOR[type](albumId, options);