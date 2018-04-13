const { DataTypes } = require('sequelize');

const { TABLE_NAME, ROLE } = require('../constants');

const DEFINITION_OBJECT = {
  id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  name: {type: DataTypes.ENUM([ROLE.ADMIN, ROLE.USER]), allowNull: false, defaultValue: 'user'}
};

const CONFIGURATION_OBJECT = {
  tableName: TABLE_NAME,
  timestamps: false
};


module.exports = {
  DEFINITION_OBJECT,
  CONFIGURATION_OBJECT
};
