require('bluebird');

const models = require('../../index');
const { sequelize } = models;


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Artist.findById(id, {
      include: [
        {
          model: models.Label,
          as: 'label'
        },
        {
          model: models.Song,
          as: 'songs',
          through: {attributes: []} // remove junction table from result
        }
      ],
      ...options
    })
  })
};


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.Artist.findAndCountAll(options)
    .then(artists => ({data: artists.rows, total: artists.count}))
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Artist.create(content, options)
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Artist.update(content, {where, ...options, individualHooks: true})
    .then(() => models.Artist.findById(content.id, {transaction}))
    .tap(artist => artist.setSongs(content.songs.map(song => song.id), {transaction, individualHooks: true}))
  })
};


module.exports = {
  fetchById,
  fetch,
  createOne,
  updateOne
};