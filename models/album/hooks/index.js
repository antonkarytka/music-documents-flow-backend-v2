const models = require('../../index');
const { sequelize } = models;
const { TYPE: { ARTIST_NEW_ALBUM } } = require('../../event-log/constants');

const hooks = {
  afterCreate: (content, options) => handleCreation(content, options)
};

function handleCreation(content, options) {
  return sequelize.continueTransaction(options, transaction => {
    return models.EventLog.createOne({
      type: ARTIST_NEW_ALBUM,
      data: {
        artistId: content.artistId,
        albumId: content.id
      }
    }, {transaction})
  })
}


module.exports = hooks;