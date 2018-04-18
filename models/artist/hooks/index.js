const Promise = require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const { TYPE: { LABEL_SIGNED_ARTIST, LABEL_FIRED_ARTIST } } = require('../../event-log/constants');

const hooks = {};

hooks.afterUpdate = (content, options) => handleChanges(content, options);

const onChange = {
  'labelId': (content, {transaction}) => {
    const previousLabelId = content._previousDataValues.labelId;

    if (content.labelId === null) {
      return models.EventLog.createOne({
        type: LABEL_FIRED_ARTIST,
        data: {
          artistId: content.id,
          labelId: previousLabelId
        }
      }, {transaction})
    } else {
      return models.EventLog.createOne({
        type: LABEL_SIGNED_ARTIST,
        data: {
          artistId: content.id,
          labelId: content.labelId
        }
      }, {transaction})
    }
  }
};


function handleChanges(content, options = {}) {
  return sequelize.continueTransaction(options, transaction => {
    return Promise.map(Object.keys(onChange), key => content.changed(key) && onChange[key](content, {transaction}))
  })
}


module.exports = hooks;