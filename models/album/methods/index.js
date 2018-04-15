require('bluebird');

const models = require('../../index');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Album.findById(id, {
      include: [
        {
          model: models.Artist,
          as: 'artist'
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
    return models.Album.findAll({transaction, ...options})
  })
};


const createOne = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Album.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Album.update(content, {where, transaction, ...options})
    .then(() => models.Album.findById(content.id, {transaction}))
    .tap(album => album.setSongs(content.songs, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};