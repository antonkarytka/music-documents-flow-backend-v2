require('bluebird');

const models = require('../../index');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Song.findById(id, {
      include: [
        {
          model: models.Artist,
          as: 'artists'
        },
        {
          model: models.Album,
          as: 'album'
        }
      ],
      transaction,
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Song.findAll({transaction, ...options})
  })
};


const createOne = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Song.create(content, {transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.Song.update(content, {where, transaction, ...options})
    .then(() => models.Song.findById(content.id, {transaction}))
    .tap(song => song.setArtists(content.artists, {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};