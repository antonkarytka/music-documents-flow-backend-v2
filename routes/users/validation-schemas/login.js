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
  }
};