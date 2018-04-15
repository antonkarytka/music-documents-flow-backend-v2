require('bluebird');

const models = require('../../index');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Artist.findById(id, {
      include: [
        {
          model: models.Label,
          as: 'label'
        },
        {
          model: models.Song,
          as: 'songs'
        }
      ],
      transaction,
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Artist.findAll({transaction, ...options})
  })
};


const createOne = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Artist.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Artist.update(content, {where, transaction, ...options})
    .then(() => models.Artist.findById(content.id, {transaction}))
    .tap(artist => artist.setSongs(content.songs, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};