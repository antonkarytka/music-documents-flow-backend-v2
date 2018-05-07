module.exports = {
  sender: {
    in: ['body'],
    errorMessage: 'Sender property is required.'
  },
  emails: {
    in: ['body'],
    errorMessage: 'Emails property is required.'
  }
};