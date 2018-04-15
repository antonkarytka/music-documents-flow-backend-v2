module.exports = {
  albumId: {
    in: ['params'],
    isUUID: true,
    errorMessage: 'Album\'s \'id\' property is required.'
  }
};