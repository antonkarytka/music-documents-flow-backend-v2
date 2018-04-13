module.exports = (User, models) => {
  User.belongsTo(models.Role, {as: 'user', foreignKey: {name: 'roleId', allowNull: false}})
};