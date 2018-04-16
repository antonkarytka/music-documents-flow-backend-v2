'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('event_logs', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fbee1',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'LABEL_SIGNED_ARTIST',
      data: JSON.stringify({
        labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c3',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a1'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee2',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'LABEL_SIGNED_ARTIST',
      data: JSON.stringify({
        labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c4',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee3',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'LABEL_SIGNED_ARTIST',
      data: JSON.stringify({
        labelId: 'e9649888-440e-4cc7-8832-e34df98fb1c2',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee4',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1d1'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee5',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d2',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee6',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a2'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee7',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d3',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee8',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d4',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a3'
      }),
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbee9',
      createdAt: new Date(),
      updatedAt: new Date(),
      type: 'ARTIST_NEW_SONG',
      data: JSON.stringify({
        songId: 'e9649888-440e-4cc7-8832-e34df98fb1d4',
        artistId: 'e9649888-440e-4cc7-8832-e34df98fb1a4'
      }),
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
