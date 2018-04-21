module.exports = (SongListeningStatistics, models) => {
  SongListeningStatistics.belongsTo(models.Song, {as: 'song', foreignKey: {name: 'songId', allowNull: false}, onDelete: 'cascade'});
};