require('bluebird');

const models = require('../../index');
const { sequelize } = models;


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Label.findById(id, {
      include: [{
        model: models.Artist,
        as: 'artists'
      }],
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Label.findAll(options)
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Label.create(content, options)
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Label.update(content, {where, ...options, individualHooks: true})
    .then(() => models.Label.findById(content.id, {transaction}))
    .tap(label => label.setArtists(content.artists.map(artist => artist.id), {transaction, individualHooks: true}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};