const { DataTypes } = require('sequelize');
const { TABLE_NAME } = require('../constants');

const DEFINITION_OBJECT = {
  id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  firstName: {type: DataTypes.STRING, allowNull: false},
  lastName: {type: DataTypes.STRING, allowNull: false},
  email: {type: DataTypes.STRING, allowNull: false},
  password: {type: DataTypes.STRING, allowNull: false},
  birthDate: {type: DataTypes.DATE, allowNull: false}
};

const CONFIGURATION_OBJECT = {
  tableName: TABLE_NAME,
  indexes: [{
    unique: true,
    fields: ['email']
  }]
};


module.exports = {
  DEFINITION_OBJECT,
  CONFIGURATION_OBJECT
};
