const DOCUMENT_GENERATOR = {
  pdf: require('./pdf/index'),
  xml: require('./xml/index'),
};

module.exports = ({type, artistId}, options = {}) => DOCUMENT_GENERATOR[type](artistId, options);