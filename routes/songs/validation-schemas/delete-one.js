module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Song\'s \'id\' property is required.'
  }
};