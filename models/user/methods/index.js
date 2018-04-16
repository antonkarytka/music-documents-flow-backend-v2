const Promise = require('bluebird');
const bcrypt = require('bcrypt');

const models = require('../../index');
const { generateToken } = require('../../../helpers/tokens');


const fetchById = (id, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.findById(id, {transaction, ...options})
  })
};


const fetchAll = (options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.findAll({transaction, ...options})
  })
};


const updateOne = (where, content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.update(content, {where, transaction, ...options})
    .then(() => models.User.findById(content.id, {transaction}))
  })
};


const logIn = ({email, password}, options = {}) => {
  return models.User.find({where: {email}, ...options})
  .then(user => {
    if (!user) return Promise.reject(`Could not find user with email ${email}`);

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return Promise.reject(`Provided password doesn't match the real one.`);

    return { user, token: generateToken({userId: user.id}) }
  })
};


const signUp = (content, options = {}) => {
  return models.sequelize.transaction(transaction => {
    return models.User.fetchById(content.id, {transaction, ...options})
    .then(user => {
      if (user) return Promise.reject(`User ${user.firstName} ${user.lastName} already exists.`);

      return models.User.create(
        {...content, password: bcrypt.hashSync(content.password, 10)},
        {transaction, ...options}
      )
      .then(createdUser => Promise.resolve(Object.assign(createdUser, {plainPassword: content.password})))
    })
    .then(({email, plainPassword}) => logIn({email, password: plainPassword}, {transaction, ...options}))
  })
};


module.exports = {
  fetchById,
  fetchAll,
  signUp,
  logIn,
  updateOne
};