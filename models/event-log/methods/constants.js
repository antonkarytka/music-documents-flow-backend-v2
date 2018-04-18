const models = require('../../index');

const DETALIZATION_ITEM = {
  'labelId': { model: models.Label, fieldName: 'label' },
  'artistId': { model: models.Artist, fieldName: 'artist' },
  'albumId': { model: models.Song, fieldName: 'album' },
  'songId': { model: models.Song, fieldName: 'song' }
};

module.exports = {
  DETALIZATION_ITEM
};