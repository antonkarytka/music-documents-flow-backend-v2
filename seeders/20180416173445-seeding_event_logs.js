const event_logs  = require('./data/event_logs/index')

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('event_logs', [
     event_logs.get('Label3Artist1'),
     event_logs.get('Label4Artist2'),
     event_logs.get('Label2Artist3'),
     event_logs.get('Artist1Song1'),
     event_logs.get('Artist2Song2'),
     event_logs.get('Artist2Song1'),
     event_logs.get('Artist3Song3'),
     event_logs.get('Artist3Song4')
   ], {});
  },

  down: (queryInterface, Sequelize) => {
  }
};
