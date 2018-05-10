const Promise = require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const generateDocument = require('./documents-generation');


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.Artist.findById(id, {
      include: [
        {
          model: models.Label,
          as: 'label'
        },
        {
          model: models.Album,
          as: 'albums'
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
  options.limit = Number(options.limit) || 1000;
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
    .then(() => models.Artist.fetchById(content.id, {transaction}))
    .tap(artist => {
      return artist.setSongs(content.songs.map(song => song.id), {transaction, individualHooks: true})
      .then(() => {
        const previousAlbumIds = artist.albums && artist.albums.map(album => album.id) || [];
        const nextAlbumIds = content.albums.map(album => album.id);

        const albumsToDestroy = previousAlbumIds.filter(albumId => !nextAlbumIds.includes(albumId));
        const albumsToUpdate = nextAlbumIds.filter(albumId => !previousAlbumIds.includes(albumId));

        return Promise.join(
          Promise.each(albumsToUpdate, albumId => models.Album.update(
            { artistId: artist.id },
            { where: { id: albumId }, transaction }
          )),
          Promise.each(albumsToDestroy, albumId => models.Album.deleteOne(
            { id: albumId },
            null,
            { transaction }
          ))
        )
      })
      .then(() => {
        // If album has been added to an artist, need to create corresponding ArtistSong entries.
        return models.Artist.fetchById(artist.id, {
          attributes: ['id'],
          include: [
            {
              model: models.Album,
              as: 'albums',
              include: [{
                model: models.Song,
                as: 'songs'
              }]
            },
            {
              model: models.Song,
              as: 'songs'
            }
          ],
          transaction
        })
        .then(artist => {
          // songs from all artist's albums
          let albumSongIds = [];
          artist.albums.length && artist.albums.forEach(album => {
            if (album.songs.length) albumSongIds = albumSongIds.concat(album.songs.map(song => song.id))
          });

          // all artist's songs including feats
          const artistPreviousSongIds = artist.songs && artist.songs.map(song => song.id);

          const artistSongIds = [...albumSongIds, ...artistPreviousSongIds];
          return artist.setSongs(artistSongIds, {transaction, individualHooks: true})
        })
      })
    })
  })
};


const deleteOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Artist.destroy(
      {where, ...options}
    )
  })
}


const createDocument = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return generateDocument(content, options)
  })
};


module.exports = {
  fetchById,
  fetch,
  createOne,
  updateOne,
  deleteOne,
  createDocument
};