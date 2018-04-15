module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Song\'s \'id\' property is required.'
  },
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Song\'s \'name\' property is required.'
  },
  albumId: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Song\'s \'albumId\' property is required.'
  },
  album: {
    in: ['body'],
    isObject: true,
    errorMessage: 'Song\'s \'album\' property is required.'
  },
  artists: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Song\'s \'artists\' property is required.'
  }
};