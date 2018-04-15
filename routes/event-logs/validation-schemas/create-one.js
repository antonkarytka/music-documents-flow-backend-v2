module.exports = {
  type: {
    in: ['body'],
    isString: true,
    errorMessage: 'Event log\'s \'type\' property is required.'
  },
  data: {
    in: ['body'],
    isObject: true,
    errorMessage: 'Event log\'s \'data\' property is required.'
  }
};