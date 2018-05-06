module.exports = (ArtistSong, models) => {
  ArtistSong.belongsTo(models.Artist, {foreignKey: {name: 'artistId', allowNull: false}, onDelete: 'CASCADE'});
  ArtistSong.belongsTo(models.Song, {foreignKey: {name: 'songId', allowNull: false}, onDelete: 'CASCADE'});
};