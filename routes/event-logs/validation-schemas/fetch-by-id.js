module.exports = {
  eventLogId: {
    in: ['params'],
    isUUID: true,
    errorMessage: 'Event log\'s \'id\' property is required.'
  }
};