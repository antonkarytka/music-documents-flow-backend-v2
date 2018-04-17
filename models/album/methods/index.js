require('bluebird');

const models = require('../../index');
const { sequelize } = models;


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
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
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Album.findAll(options)
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Album.create(content, options)
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.update(content, {where, ...options})
    .then(() => models.Album.findById(content.id, {transaction}))
    .tap(album => album.setSongs(content.songs.map(song => song.id), {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};