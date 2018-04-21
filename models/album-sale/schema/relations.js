module.exports = (AlbumSale, models) => {
  AlbumSale.belongsTo(models.Album, {as: 'album', foreignKey: {name: 'albumId', allowNull: false}});
};