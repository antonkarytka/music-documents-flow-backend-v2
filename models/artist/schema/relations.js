module.exports = (Artist, models) => {
  Artist.belongsTo(models.Label, {as: 'label', foreignKey: {name: 'labelId', allowNull: true}});
  Artist.hasMany(models.Album, {as: 'albums', foreignKey: {name: 'artistId', allowNull: false}});
  Artist.belongsToMany(models.Song, {through: models.ArtistSong, foreignKey: 'artistId', allowNull: false})
};