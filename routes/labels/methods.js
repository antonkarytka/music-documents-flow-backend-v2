require('bluebird');
const models = require('../../models');

module.exports = {
  fetchById: (id, options = {}) => {
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
  },
  fetchAll: (options = {}) => {
    return models.sequelize.transaction(transaction => {
      return models.Label.findAll({transaction, ...options})
    })
  },
  createOne: (content, options = {}) => {
    return models.sequelize.transaction(transaction => {
      return models.Label.create(content, {transaction, ...options})
    })
  },
  updateOne: (where, content, options = {}) => {
    return models.sequelize.transaction(transaction => {
      return models.Label.update(content, {where, transaction, ...options})
      .then(() => models.Label.findById(content.id, {transaction}))
      .tap(label => label.setArtists(content.artists, {transaction}))
    })
  }
};