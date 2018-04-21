module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Album\'s \'id\' property is required.'
  }
};