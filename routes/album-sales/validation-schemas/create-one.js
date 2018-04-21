module.exports = {
  albumId: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Album Id property is required.'
  }
};