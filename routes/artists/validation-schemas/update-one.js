module.exports = {
  id: {
    in: ['body'],
    isUUID: true,
    errorMessage: 'Artist\'s \'id\' property is required.'
  },
  firstName: {
    in: ['body'],
    isString: true,
    errorMessage: 'Artist\'s \'firstName\' property is required.'
  },
  lastName: {
    in: ['body'],
    isString: true,
    errorMessage: 'Artist\'s \'lastName\' property is required.'
  },
  label: {
    in: ['body'],
    errorMessage: 'Artist\'s \'label\' property is required.'
  },
  songs: {
    in: ['body'],
    isArray: true,
    errorMessage: 'Artist\'s \'songs\' property is required.'
  }
};