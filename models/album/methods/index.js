const Promise = require('bluebird');

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


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.Album.findAndCountAll(options)
    .then(albums => ({data: albums.rows, total: albums.count}))
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.create(content, options)
    .tap(({id: albumId}) => content.songs && Promise.each(content.songs, song => {
      return models.Song.upsertOne({name: song.name, albumId}, {...song, albumId}, {transaction})
    }))
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.update(content, {where, ...options, individualHooks: true})
    .then(() => models.Album.findById(content.id, {transaction}))
    .tap(album => album.setSongs(content.songs.map(song => song.id), {transaction, individualHooks: true}))
  })
};


const deleteOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Album.destroy(
      { where, ...options}
    )
  })
};


module.exports = {
  fetchById,
  fetch,
  createOne,
  updateOne,
  deleteOne
};