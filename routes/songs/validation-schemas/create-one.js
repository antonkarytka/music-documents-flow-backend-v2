module.exports = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Album\'s \'name\' property is required.'
  },
  artists: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Album\'s \'artists\' property is required.'
  }
};