const users  = require('./data/users/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      users.get('First User'),
      users.get('Second User'),
      users.get('Third User'),
    ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
