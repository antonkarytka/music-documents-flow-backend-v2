const MODEL_NAME = 'EventLog';
const TABLE_NAME = 'event_logs';

const TYPE = {
  LABEL_SIGNED_ARTIST: 'LABEL_SIGNED_ARTIST',
  LABEL_FIRED_ARTIST: 'LABEL_FIRED_ARTIST',
  LABEL_RENAMED: 'LABEL_RENAMED',
  ARTIST_NEW_FIRST_NAME: 'ARTIST_NEW_FIRST_NAME',
  ARTIST_NEW_LAST_NAME: 'ARTIST_NEW_LAST_NAME',
  ARTIST_NEW_SONG: 'ARTIST_NEW_SONG',
  ARTIST_NEW_ALBUM: 'ARTIST_NEW_ALBUM',
  ALBUM_RENAMED: 'ALBUM_RENAMED',
  ALBUM_NEW_LABEL: 'ALBUM_NEW_LABEL',
  ALBUM_NEW_ARTIST: 'ALBUM_NEW_ARTIST',
  SONG_RENAMED: 'SONG_RENAMED',
  SONG_MOVED_TO_ANOTHER_ALBUM: 'SONG_MOVED_TO_ANOTHER_ALBUM'
};

module.exports = {
  MODEL_NAME,
  TABLE_NAME,
  TYPE
};