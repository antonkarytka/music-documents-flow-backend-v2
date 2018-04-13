const { DataTypes } = require('sequelize');
const { TABLE_NAME } = require('../constants');

const DEFINITION_OBJECT = {
  id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4}
};

const CONFIGURATION_OBJECT = {
  tableName: TABLE_NAME,
  timestamps: false,
  indexes: [{
    unique: true,
    fields: ['artistId', 'songId']
  }]
};


module.exports = {
  DEFINITION_OBJECT,
  CONFIGURATION_OBJECT
};
