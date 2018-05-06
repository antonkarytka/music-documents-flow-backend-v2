module.exports = (Album, models) => {
  Album.belongsTo(models.Artist, {as: 'artist', foreignKey: {name: 'artistId', allowNull: false }, onDelete: 'CASCADE'});
  Album.hasMany(models.Song, {as: 'songs', foreignKey: {name: 'albumId', allowNull: false}, onDelete: 'CASCADE'});
  Album.hasMany(models.AlbumSale, {as: 'sales', foreignKey: {name: 'albumId', allowNull: false}});
};