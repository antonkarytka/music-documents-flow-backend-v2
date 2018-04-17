const models = require('../../index');
const { sequelize } = models;
const { TYPE: { LABEL_SIGNED_ARTIST, LABEL_FIRED_ARTIST } } = require('../../event-log/constants');

const hooks = {};

hooks.afterUpdate = (content, options) => {
  return sequelize.continueTransaction(options, transaction => {
    const previousValues = content._previousDataValues;

    if (content.labelId === null) {
      return models.EventLog.createOne({
        type: LABEL_FIRED_ARTIST,
        data: {
          artistId: content.id,
          labelId: previousValues.labelId
        }
      }, {transaction})
    } else if (previousValues.labelId !== content.labelId) {
      return models.EventLog.createOne({
        type: LABEL_SIGNED_ARTIST,
        data: {
          artistId: content.id,
          labelId: content.labelId
        }
      }, {transaction})
    }
  })
};

module.exports = hooks;