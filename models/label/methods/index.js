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


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.Label.findAndCountAll(options)
    .then(labels => ({data: labels.rows, total: labels.count}))
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
  fetch,
  createOne,
  updateOne
};