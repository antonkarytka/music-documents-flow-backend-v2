const roles  = require('./data/roles/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('roles', [
     roles.get('Admin'),
     roles.get('User')
   ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
