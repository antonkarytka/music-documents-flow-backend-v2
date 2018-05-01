const Promise = require('bluebird');
const Excel = require('exceljs');
var _ = require('lodash');

const models = require('../../../../index');
const { sequelize } = models;

module.exports = (artistId, options = {}) => {
  return sequelize.continueTransaction(options, transaction => {
    return models.Artist.fetchById(artistId, {
      include: [
        {
          model: models.Label,
          as: 'label'
        },
        {
          model: models.Song,
          as: 'songs',
          through: {attributes: []}, // remove junction table from result
          include: [{
            model: models.Album,
            as: 'album'
          }]
        }
      ],
      transaction
    })
    .then(artist => {
      const workbook = new Excel.Workbook();

      getArtistInfoSheet(workbook, artist);
      getSongsSheet(workbook, artist.songs);

      return workbook.xlsx.writeBuffer();
    })
  });
};


function getSongsSheet(workbook, songs) {
  const songsSheet = workbook.addWorksheet('Songs', {
    pageSetup: { fitToPage: true }
  });

  songsSheet.columns = [
    { header: 'Name', key: 'name', width: 20 },
    { header: 'Release date', key: 'releaseDate', width: 20 },
    { header: 'Album\'s name', key: 'albumName', width: 20 },
    { header: 'Album\'s release date', key: 'albumReleaseDate', width: 20 },
  ];

  songsSheet.getRow(1).font = {
    bold: true
  };

  songs.forEach(song => {
    songsSheet.addRow({
      name: song.name,
      releaseDate: song.createdAt,
      albumName: song.album.name,
      albumReleaseDate: song.album.createdAt
    });
  });  

  setCellsProperites(songsSheet);
}

function getArtistInfoSheet(workbook, artist) {
  const artistSheet = workbook.addWorksheet('Artist general info', {
    pageSetup: { fitToPage: true }
  });

  artistSheet.columns = [
    { header: 'First Name', key: 'firstName', width: 20 },
    { header: 'Last Name', key: 'lastName', width: 20 },
    { header: 'Label', key: 'label', width: 20 },
    { header: 'Label\'s creation date', key: 'labelCreatedAt', width: 20 },
  ];

  artistSheet.getRow(1).font = {
    bold: true
  };

  artistSheet.addRow({
    firstName: artist.firstName,
    lastName: artist.lastName,
    label: artist.label.name,
    labelCreatedAt: artist.label.createdAt
  });

  setCellsProperites(artistSheet);
}


function setCellsProperites(sheet) {
  sheet.eachRow(row => {
    row.eachCell(cell => {
      cell.alignment = {
        ...cell.alignment,
        vertical: 'middle',
        horizontal: 'center',
        wrapText: true
      };
    });
  });
}


function generateSongName({song, albumArtist}) {
  const featuredArtists = song.artists.filter(songArtist => songArtist.id !== albumArtist.id);
  if (featuredArtists.length) {
    const featuredArtistsString = featuredArtists.map(artist => `${artist.firstName} ${artist.lastName}, `).join('').slice(0, -2);
    return `${song.name} (feat. ${featuredArtistsString})`;
  } else {
    return song.name;
  }
}