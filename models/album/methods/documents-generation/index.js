const DOCUMENT_GENERATOR = {
  pdf: require('./pdf')
};

module.exports = ({type, albumId}, options = {}) => DOCUMENT_GENERATOR[type](albumId, options);