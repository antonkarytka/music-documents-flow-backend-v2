module.exports = {
  songId: {
    in: ['params'],
    isUUID: true,
    errorMessage: 'Song\'s \'id\' property is required.'
  }
};