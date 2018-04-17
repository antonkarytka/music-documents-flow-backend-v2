const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const secret = require('../config/config').secret;
const models = require('../models');

const generateToken = ({userId}) => jwt.sign({userId}, secret, {expiresIn: '24 hours'});

const validateToken = token => {
  // Check token's validity except expiration date. If successful then token is valid.
  return jwt.verify(token, secret, {ignoreExpiration: true}, err => {
    if (err) return Promise.reject('Provided token is invalid.');

    // If token expired and user by userId from payload exists, return a new token.
    return jwt.verify(token, secret, err => {
      if (err) {
        const { userId } = jwt.decode(token, secret);
        return models.User.fetchById(userId)
        .then(user => {
          if (user) return generateToken({userId});
          else return Promise.reject(`Could not find user (${userId}) by userId provided in token's payload.`);
        })
      }

      return Promise.resolve(token);
    })
  })
};


module.exports = {
  generateToken,
  validateToken
};