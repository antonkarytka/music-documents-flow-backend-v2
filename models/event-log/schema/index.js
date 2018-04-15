const { DataTypes } = require('sequelize');
const { TYPE, TABLE_NAME } = require('../constants');

const DEFINITION_OBJECT = {
  id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  type: {type: DataTypes.ENUM(Object.values(TYPE)), allowNull: false},
  data: {type: DataTypes.JSONB, allowNull: false}
};

const CONFIGURATION_OBJECT = {
  tableName: TABLE_NAME,
  indexes: [
    {
      fields: ['type']
    },
    {
      fields: ['data']
    }
  ]
};


module.exports = {
  DEFINITION_OBJECT,
  CONFIGURATION_OBJECT
};
