require('bluebird');
const bcrypt = require('bcrypt');

const models = require('../../index');
const passport = require('../../../helpers/passport');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.findById(id, {transaction, ...options})
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.findAll({transaction, ...options})
  })
};


const signUp = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.fetchById(content.id, {transaction, ...options})
    .then(user => !user && bcrypt.hash(content.password, 10))
    .then(hash => models.User.create(
      {
        ...content,
        password: hash
      },
      {
        transaction,
        ...options
      }
    ))
  })
};


const logIn = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.update(content, {where, transaction, ...options})
    .then(() => models.User.findById(content.id, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  signUp,
  logIn,
  updateOne
};