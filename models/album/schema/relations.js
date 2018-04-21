module.exports = (Album, models) => {
  Album.belongsTo(models.Artist, {as: 'artist', foreignKey: {name: 'artistId', allowNull: false }, onDelete: 'cascade'});
  Album.hasMany(models.Song, {as: 'songs', foreignKey: {name: 'albumId', allowNull: true}});
};