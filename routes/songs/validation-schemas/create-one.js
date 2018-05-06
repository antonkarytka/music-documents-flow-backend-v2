module.exports = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Album\'s \'name\' property is required.'
  },
  albumId: {
    in: ['body'],
    isUUID: true,
    optional: true
  },
  artists: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Album\'s \'artists\' property is required and cannot be an empty array.',
    custom: {
      options: value => value.length > 0
    },
  }
};