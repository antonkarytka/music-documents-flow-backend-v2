module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role',
    {
      id: {type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4},
      name: {type: DataTypes.ENUM(['admin', 'user']), allowNull: false, defaultValue: 'user'}
    },
    {
      timestamps: false
    }
  );

  Role.associate = function(models) {
    Role.hasMany(models.User, {as: 'users', foreignKey: {name: 'roleId', allowNull: false}})
  };

  return Role;
};