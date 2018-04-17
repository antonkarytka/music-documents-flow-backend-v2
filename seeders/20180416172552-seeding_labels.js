const labels  = require('./data/labels/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('labels', [
      labels.get('First Label'),
      labels.get('Second Label'),
      labels.get('Third Label'),
      labels.get('Fourth Label')], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
