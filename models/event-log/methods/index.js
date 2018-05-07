const Promise = require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const { DETALIZATION_ITEM } = require('./constants');


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.EventLog.findById(id, options)
    .then(eventLog => addDetailedInfo(eventLog, {transaction}))
  })
};


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 1000;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, transaction => {
    return models.EventLog.findAndCountAll({order: [['createdAt', 'DESC']], ...options})
    .then(eventLogs => {
      return Promise.map(eventLogs.rows, eventLog => addDetailedInfo(eventLog, {transaction}))
      .then(detailedEventLogs => ({data: detailedEventLogs, total: eventLogs.count}))
    })
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.EventLog.create(content, {...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.EventLog.update(content, {where, ...options, individualHooks: true})
    .then(() => models.EventLog.findById(content.id, {transaction}))
  })
};


function addDetailedInfo(eventLog, options = {}) {
  const decoratedEventLog = eventLog.toJSON();

  return sequelize.continueTransaction(options, transaction => {
    return Promise.each(Object.keys(decoratedEventLog.data), key => {
      return DETALIZATION_ITEM[key] && DETALIZATION_ITEM[key].model.fetchById(decoratedEventLog.data[key], {transaction})
      .then(detailedInfo => Object.assign(decoratedEventLog, {[DETALIZATION_ITEM[key].fieldName]: detailedInfo}))
    })
    .then(() => decoratedEventLog)
  })
}


module.exports = {
  fetchById,
  fetch,
  createOne,
  updateOne
};