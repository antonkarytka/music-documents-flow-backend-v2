'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('songs', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
      name: 'First Song',
      createdAt: new Date(),
      updatedAt: new Date(),
      albumId: 'e9649888-440e-4cc7-8832-e34df98fb1b1'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1d2',
      name: 'Second Song',
      createdAt: new Date(),
      updatedAt: new Date(),
      albumId: 'e9649888-440e-4cc7-8832-e34df98fb1b1'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1d3',
      name: 'Third Song',
      createdAt: new Date(),
      updatedAt: new Date(),
      albumId: 'e9649888-440e-4cc7-8832-e34df98fb1b1'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1d4',
      name: 'Fourth Song',
      createdAt: new Date(),
      updatedAt: new Date(),
      albumId: 'e9649888-440e-4cc7-8832-e34df98fb1b2'
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
