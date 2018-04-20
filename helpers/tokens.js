const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const secret = require('../config/config').secret;
const models = require('../models');

const generateToken = ({userId}) => jwt.sign({userId}, secret, {expiresIn: '365 days'});

const validateToken = (token, {transaction} = {}) => {
  return jwt.verify(token, secret, null, (err, decoded) => {
    if (err) return Promise.reject('Provided token is invalid.');

    const { userId } = decoded;
    return models.User.fetchById(userId, {transaction})
    .then(user => {
      if (user) return Promise.resolve(user);
      else return Promise.reject(`Could not find user (${userId}) by userId provided in token's payload.`);
    })
  })
};


module.exports = {
  generateToken,
  validateToken
};