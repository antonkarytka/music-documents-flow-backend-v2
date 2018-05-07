const Promise = require('bluebird');

const models = require('../models');
const { sequelize } = models;
const { ROLE: { USER, ADMIN } } = require('../models/role/constants');
const { validateToken } = require('../helpers/tokens');


const validateUserRole = (req, res, next, requiredRole) => {
  let token = req.get('Authorization');
  if (!token) return res.status(401).json(`Authorization token is required for operation: ${req.method} ${req.originalUrl}.`);
  token = token.replace(/Bearer */, '');

  return sequelize.continueTransaction({}, transaction => {
    return validateToken(token, {transaction})
    .then((user) => {
      return models.Role.findById(user.roleId, {transaction})
      .then((role) => {
        if (role.name === ADMIN && requiredRole === USER) return next();
        if (role.name !== requiredRole) return Promise.reject(`User doesn't have enough rights for required operation.`);
        return next();
      })
      .catch(err => res.status(403).json(err))
    })
    .catch(err => res.status(401).json(err))
  });
};

const ensureUser = (req, res, next) => validateUserRole(req, res, next, USER);

const ensureAdmin = (req, res, next) => validateUserRole(req, res, next, ADMIN);


module.exports = {
  ensureUser,
  ensureAdmin
};