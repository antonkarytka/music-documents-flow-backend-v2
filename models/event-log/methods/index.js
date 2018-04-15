require('bluebird');

const models = require('../../index');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.EventLog.findById(id, {transaction, ...options})
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.EventLog.findAll({transaction, ...options})
  })
};


const createOne = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.EventLog.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.EventLog.update(content, {where, transaction, ...options})
    .then(() => models.EventLog.findById(content.id, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};