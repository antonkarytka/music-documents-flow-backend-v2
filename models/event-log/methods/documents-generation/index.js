const { TYPE } = require('../../constants');

const DOCUMENT_GENERATOR = {
  [TYPE.ARTIST_NEW_SONG]: require('./ARTIST_NEW_SONG')
};


const generateDocument = ({eventLog, type}, options = {}) => DOCUMENT_GENERATOR[eventLog.type][type](eventLog, options);

module.exports = generateDocument;