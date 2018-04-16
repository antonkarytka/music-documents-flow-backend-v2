module.exports = (Song, models) => {
  Song.belongsTo(models.Album, {as: 'album', foreignKey: {name: 'albumId', allowNull: true}});
  Song.belongsToMany(models.Artist, {through: models.ArtistSong, as: 'artists', foreignKey: 'songId', allowNull: false})
};