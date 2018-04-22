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


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.Song.findAndCountAll(options)
    .then(songs => ({data: songs.rows, total: songs.count}))
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.create(content, options)
    .tap(song => song.setArtists(content.artists.map(artist => artist.id), {transaction, individualHooks: true}))
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.update(content, {where, ...options, individualHooks: true})
    .then(() => models.Song.findById(content.id, {transaction}))
    .tap(song => song.setArtists(content.artists.map(artist => artist.id), {transaction, individualHooks: true}))
  })
};


const upsertOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.findOne({where, transaction})
    .then(song => {
      if (song) return models.Song.updateOne(where, content, options);
      else return models.Song.createOne(content, options)
    })
  })
};


const deleteOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Song.destroy(
      {where, ...options}
    )
  })
}


module.exports = {
  fetchById,
  fetch,
  createOne,
  updateOne,
  upsertOne,
  deleteOne
};