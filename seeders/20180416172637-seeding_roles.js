'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('roles', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fd1b1',
      name: 'admin'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fd1b2',
      name: 'user'
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
