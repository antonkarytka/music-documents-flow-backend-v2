module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Event log\'s \'id\' property is required.'
  },
  type: {
    in: ['body'],
    isString: true,
    errorMessage: 'Event log\'s \'type\' property is required.'
  },
  data: {
    in: ['body'],
    errorMessage: 'Event log\'s \'data\' property is required.'
  }
};