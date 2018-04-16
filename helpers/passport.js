const passport = require('passport');
const Strategy = require('passport-local');
const bcrypt = require('bcrypt');

const models = require('../models');

passport.use(new Strategy({usernameField: 'email', session: false}, (email, password, done) => {
  return models.User.find({where: {email}})
  .then(user => {
    if (!user) return done(null, false);
    return bcrypt.compare(password, user.password, (err, isValid) => {
      if (err) return done(err);
      if (!isValid) return done(null, false);

      return done(null, user)
    })
  })
  .catch(err => done(err))
}));

module.exports = passport;