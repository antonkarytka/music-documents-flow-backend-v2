module.exports = {
  artistId: {
    in: ['params'],
    isUUID: true,
    errorMessage: 'Artist\'s \'id\' property is required.'
  }
};