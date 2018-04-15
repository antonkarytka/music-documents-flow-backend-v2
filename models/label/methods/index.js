require('bluebird');

const models = require('../../index');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Label.findById(id, {
      include: [{
        model: models.Artist,
        as: 'artists'
      }],
      transaction,
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Label.findAll({transaction, ...options})
  })
};


const createOne = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Label.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Label.update(content, {where, transaction, ...options})
    .then(() => models.Label.findById(content.id, {transaction}))
    .tap(label => label.setArtists(content.artists, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};