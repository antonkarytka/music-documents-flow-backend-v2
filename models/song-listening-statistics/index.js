const { MODEL_NAME } = require('./constants');
const { DEFINITION_OBJECT, CONFIGURATION_OBJECT } = require('./schema');
const establishRelations = require('./schema/relations');

module.exports = sequelize => {
  const SongListeningStatistics = sequelize.define(MODEL_NAME, DEFINITION_OBJECT, CONFIGURATION_OBJECT);

  SongListeningStatistics.associate = models => establishRelations(SongListeningStatistics, models);

  return SongListeningStatistics;
};