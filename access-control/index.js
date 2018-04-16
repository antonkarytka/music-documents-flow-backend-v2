const Promise = require('bluebird');
const jwt = require('jsonwebtoken');

const secret = require('../config/config').secret;
const models = require('../models');
const { ROLE } = require('../models/role/constants');


const validateUserRole = (req, res, next, requiredRole) => {
  const token = req.get('Authorization');
  if (!token) return res.status(401).json(`Authorization token is required for required operation: ${req.method} ${req.originalUrl}.`);

  const decodedToken = jwt.verify(token, secret);
  if (!decodedToken) return res.status(401).json('Provided token is invalid.');

  const { userId } = decodedToken;
  return models.User.fetchById(userId)
  .then(user => {
    if (!user) return Promise.reject(`Could not find user (${userId}) provided in token's payload.`);

    return models.Role.findById(user.roleId)
    .then(role => {
      if (role !== requiredRole) return Promise.reject(`User doesn't have enough rights for required operation.`);
      return next();
    })
  })
  .catch(err => res.status(403).json(err))
};

const ensureUser = (req, res, next) => validateUserRole(req, res, next, ROLE.USER);

const ensureAdmin = (req, res, next) => validateUserRole(req, res, next, ROLE.ADMIN);


module.exports = {
  ensureUser,
  ensureAdmin
};