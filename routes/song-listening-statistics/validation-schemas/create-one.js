module.exports = {
  songId: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Song Id property is required.'
  }
};