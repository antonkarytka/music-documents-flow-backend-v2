module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User',
    {
      id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
      firstName: {type: DataTypes.STRING, allowNull: false},
      lastName: {type: DataTypes.STRING, allowNull: false},
      email: {type: DataTypes.STRING, allowNull: false},
      password: {type: DataTypes.STRING, allowNull: false},
      birthDate: {type: DataTypes.DATE, allowNull: false}
    },
    {
      indexes: [
        {
          fields: ['lastName']
        },
        {
          unique: true,
          fields: ['email']
        }
      ]
    }
  );

  User.associate = function(models) {
    User.belongsTo(models.Role, {as: 'user', foreignKey: {name: 'roleId', allowNull: false}})
  };

  return User;
};