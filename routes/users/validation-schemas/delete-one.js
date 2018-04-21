module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'User\'s \'id\' property is required.'
  }
};