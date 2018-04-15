module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Label\'s \'id\' property is required.'
  },
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Label\'s \'name\' property is required.'
  },
  artists: {
    in: ['body'],
    isArray: true
  }
};