module.exports = (User, models) => {
  User.belongsTo(models.Role, {as: 'role', foreignKey: {name: 'roleId', allowNull: true}});
};