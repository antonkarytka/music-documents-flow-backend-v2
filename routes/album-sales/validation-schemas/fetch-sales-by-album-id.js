module.exports = {
  albumId: {
    in: ['params'],
    isUUID: true,
    errorMessage: 'Album \'id\' property is required.'
  }
};