'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('artists', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fb1a1',
      firstName: 'First FirstName',
      lastName: 'First LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c3'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1a2',
      firstName: 'Second FirstName',
      lastName: 'Second LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c4'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1a3',
      firstName: 'Third FIrstName',
      lastName: 'Third LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c2'
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
