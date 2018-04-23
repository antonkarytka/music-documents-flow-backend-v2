const DOCUMENT_GENERATOR = {
  pdf: require('./pdf')
};

module.exports = ({type, songId}, options = {}) => DOCUMENT_GENERATOR[type](songId, options);