const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const secret = require('../config/config').secret;
const models = require('../models');
const { ROLE } = require('../models/role/constants');
const { validateToken } = require('../helpers/tokens');


const validateUserRole = (req, res, next, requiredRole) => {
  const token = req.get('Authorization');
  if (!token) return res.status(401).json(`Authorization token is required for operation: ${req.method} ${req.originalUrl}.`);

  return validateToken(token)
  .then(validatedToken => {
    // If all good but token expired, generate a new one.
    token !== validatedToken && res.set('Authorization', validatedToken);
    const { userId } = jwt.decode(validatedToken, secret);

    return models.User.fetchById(userId)
    .then(user => {
      return models.Role.findById(user.roleId)
      .then(role => {
        if (role !== requiredRole) return Promise.reject(`User doesn't have enough rights for required operation.`);
        return next();
      })
    })
    .catch(err => res.status(403).json(err))
  })
  .catch(err => res.status(401).json(err))
};

const ensureUser = (req, res, next) => validateUserRole(req, res, next, ROLE.USER);

const ensureAdmin = (req, res, next) => validateUserRole(req, res, next, ROLE.ADMIN);


module.exports = {
  ensureUser,
  ensureAdmin
};