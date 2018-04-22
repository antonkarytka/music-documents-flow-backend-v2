const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const models = require('../../index');
const { sequelize } = models;
const { ROLE: { USER } } = require('../../role/constants');
const { generateToken } = require('../../../helpers/tokens');


const fetchById = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.User.findById(id, options)
  })
};


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.User.findAndCountAll(options)
    .then(users => ({data: users.rows, total: users.count}))
  })
};


const updateOne = (where, content, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.User.update(content, {where, ...options, individualHooks: true})
    .then(() => models.User.findById(content.id, {transaction}))
  })
};


const logIn = ({email, password}, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.User.find({where: {email}, ...options})
    .then(user => {
      if (!user) return Promise.reject(`Could not find user with email ${email}`);

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid) return Promise.reject(`Provided password doesn't match the real one.`);

      return {user, token: generateToken({userId: user.id})}
    })
  })
};


const signUp = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.User.fetchById(content.id, {...options})
    .then(user => {
      if (user) return Promise.reject(`User ${user.firstName} ${user.lastName} already exists.`);
      return models.Role.find({where: {name: USER}, options})
      .then(({id: roleId}) => models.User.create(
        {
          ...content,
          password: bcrypt.hashSync(content.password, 10),
          roleId
        },
        {...options}
      ))
    })
    .then(({email}) => logIn({email, password: content.password}, {...options}))
  })
};


module.exports = {
  fetchById,
  fetch,
  updateOne,
  logIn,
  signUp
};