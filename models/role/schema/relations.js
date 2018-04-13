module.exports = (Role, models) => {
  Role.hasMany(models.User, {as: 'users', foreignKey: {name: 'roleId', allowNull: false}})
};