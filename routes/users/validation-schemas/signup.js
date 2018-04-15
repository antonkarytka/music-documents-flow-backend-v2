module.exports = {
  email: {
    in: ['body'],
    isEmail: true,
    errorMessage: 'User\'s \'email\' property is required.'
  },
  password: {
    in: ['body'],
    isString: true,
    errorMessage: 'User\'s \'passport\' property is required.'
  },
  firstName: {
    in: ['body'],
    isString: true,
    errorMessage: 'User\'s \'firstName\' property is required.'
  },
  lastName: {
    in: ['body'],
    isString: true,
    errorMessage: 'User\'s \'lastName\' property is required.'
  },
  birthDate: {
    in: ['body'],
    isDate: true,
    errorMessage: 'User\'s \'birthDate\' property is required.'
  }
};