module.exports = (Label, models) => {
  Label.hasMany(models.Artist, {as: 'artists', foreignKey: {name: 'labelId', allowNull: true}});
};