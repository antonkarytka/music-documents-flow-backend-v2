module.exports = (Song, models) => {
  Song.belongsTo(models.Album, {as: 'album', foreignKey: {name: 'albumId', allowNull: false}});
  Song.belongsToMany(models.Artist, {through: models.ArtistSong, as: 'artists', foreignKey: {name: 'songId', allowNull: false}});
  Song.hasMany(models.SongListeningStatistics, {as: 'listeningStatistics', foreignKey: {name: 'songId', allowNull: false}});
};