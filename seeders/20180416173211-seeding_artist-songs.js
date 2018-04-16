'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('artist_songs', [{
    id: 'e9649888-440e-4cc7-8832-e34df98fbbb1',
    artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a1',
    songId: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
  },
  {
    id: 'e9649888-440e-4cc7-8832-e34df98fbbb2',
    artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2',
    songId: 'e9649888-440e-4cc7-8832-e34df98fb1d2',
  },
  {
    id: 'e9649888-440e-4cc7-8832-e34df98fbbb3',
    artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2',
    songId: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
  },
  {
    id: 'e9649888-440e-4cc7-8832-e34df98fbbb4',
    artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3',
    songId: 'e9649888-440e-4cc7-8832-e34df98fb1d3',
  },
  {
    id: 'e9649888-440e-4cc7-8832-e34df98fbbb5',
    artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3',
    songId: 'e9649888-440e-4cc7-8832-e34df98fb1d4',
  }], {})
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
