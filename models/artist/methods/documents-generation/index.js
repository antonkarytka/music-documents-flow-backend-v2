const DOCUMENT_GENERATOR = {
  pdf: require('./pdf/index'),
  xml: require('./xml/index'),
  xlsx: require('./xlsx/index'),
};

module.exports = ({type, artistId}, options = {}) => DOCUMENT_GENERATOR[type](artistId, options);