module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Album\'s \'id\' property is required.'
  },
  name: {
    in: ['body'],
    isString: true,
    errorMessage: 'Album\'s \'name\' property is required.'
  },
  artistId: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Album\'s \'artistId\' property is required.'
  },
  artist: {
    in: ['body'],
    isObject: true,
    errorMessage: 'Album\'s \'artist\' property is required.'
  },
  songs: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Album\'s \'songs\' property is required.'
  }
};