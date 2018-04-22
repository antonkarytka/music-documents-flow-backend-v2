module.exports = (ArtistSong, models) => {
  ArtistSong.belongsTo(models.Artist, {foreignKey: {name: 'artistId', allowNull: false}});
  ArtistSong.belongsTo(models.Song, {foreignKey: {name: 'songId', allowNull: false}, onDelete: "cascade"});
};