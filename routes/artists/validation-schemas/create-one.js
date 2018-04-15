module.exports = {
  firstName: {
    in: ['body'],
    isString: true,
    errorMessage: 'Artist\'s \'firstName\' property is required.'
  },
  lastName: {
    in: ['body'],
    isString: true,
    errorMessage: 'Artist\'s \'firstName\' property is required.'
  }
};