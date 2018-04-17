require('bluebird');

const models = require('../../index');
const { sequelize } = models;

const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Song.findById(id, {
      include: [
        {
          model: models.Artist,
          as: 'artists',
          through: {attributes: []} // remove junction table from result
        },
        {
          model: models.Album,
          as: 'album'
        }
      ],
      ...options
    })
  })
};


const fetchAll = (options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Song.findAll(options)
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Song.create(content, options)
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.update(content, {where, ...options})
    .then(() => models.Song.findById(content.id, {transaction}))
    .tap(song => song.setArtists(content.artists.map(artist => artist.id), {transaction}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  createOne,
  updateOne
};