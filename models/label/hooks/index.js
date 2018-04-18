const Promise = require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const { TYPE: { LABEL_RENAMED } } = require('../../event-log/constants');

const hooks = {
  afterUpdate: (content, options) => handleChanges(content, options)
};

const onChange = {
  'name': (content, {transaction}) => {
    const previousName = content._previousDataValues.name;

    return models.EventLog.createOne({
      type: LABEL_RENAMED,
      data: {
        labelId: content.id,
        previousName,
        newName: content.name
      }
    }, {transaction})
  }
};


function handleChanges(content, options) {
  return sequelize.continueTransaction(options, transaction => {
    return Promise.map(Object.keys(onChange), key => content.changed(key) && onChange[key](content, {transaction}))
  })
}


module.exports = hooks;