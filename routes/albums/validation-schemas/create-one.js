module.exports = {
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Album\'s \'name\' property is required.'
  },
  artistId: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Album\'s \'artistId\' property is required.'
  }
};