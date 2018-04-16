'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('albums', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fb1b1',
      name: 'First Album',
      createdAt: new Date(),
      updatedAt: new Date(),
      artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a1'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1b2',
      name: 'Second Album',
      createdAt: new Date(),
      updatedAt: new Date(),
      artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2'
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fb1b3',
      name: 'Third Album',
      createdAt: new Date(),
      updatedAt: new Date(),
      artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3'
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
