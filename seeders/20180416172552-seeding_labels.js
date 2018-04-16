'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labels', [{
        id: 'e9649888-440e-4cc7-8832-e34df98fb1c1',
        name: 'First Label',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e9649888-440e-4cc7-8832-e34df98fb1c2',
        name: 'Second Label',
        createdAt: new Date(),
        updatedAt: new Date(),        
      },
      {
        id: 'e9649888-440e-4cc7-8832-e34df98fb1c3',
        name: 'Third Label',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'e9649888-440e-4cc7-8832-e34df98fb1c4',
        name: 'Fourth Label',
        createdAt: new Date(),
        updatedAt: new Date(),
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
