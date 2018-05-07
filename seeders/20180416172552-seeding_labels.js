const labels  = require('./data/labels/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labels', [
      labels.get('Good Vibes'),
      labels.get('Nice Label'),
      labels.get('Black Star'),
      labels.get('Hello recs.'),
      labels.get('Cheers'),
      labels.get('Red sun'),
      labels.get('Blue color')], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
