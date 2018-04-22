const Promise = require('bluebird');
const streams = require('memory-streams');
const PdfKit = require('pdfkit');

module.exports = eventLog => {
  const writer = new streams.WritableStream();
  const document = new PdfKit();
  document.pipe(writer);

  document.font('Helvetica-Bold').fontSize(25).text(`${eventLog.artist.firstName} ${eventLog.artist.lastName} released a new song called "${eventLog.song.name}"`, {align: 'center'}).moveDown(2);

  document.font('Helvetica-Bold').fontSize(20).text('Description', {align: 'center'});
  if (eventLog.song.artists.length > 1) {
    document.font('Helvetica').fontSize(20).text('Full list of artists featured in the new song:', {align: 'left'});
    eventLog.song.artists.forEach(artist => document.font('Helvetica').fontSize(18).text(`- ${artist.firstName} ${artist.lastName}`, {align: 'left'}));
    document.text().moveDown(2);
  } else document.font('Helvetica').fontSize(18).text(`The new song is work exclusively of ${eventLog.artist.firstName} ${eventLog.artist.lastName}. Other artists did not participate in creation of this song.`, {align: 'left'}).moveDown(2);

  document.font('Helvetica-Bold').fontSize(20).text('Artist', {align: 'center'}).moveDown(2);


  document.font('Helvetica-Bold').fontSize(20).text('Label', {align: 'center'});
  eventLog.artist.label
    ? document.font('Helvetica').fontSize(18).text(`${eventLog.artist.firstName} ${eventLog.artist.lastName} belongs to ${eventLog.artist.label.name} label.`, {align: 'left'}).moveDown(2)
    : document.font('Helvetica').fontSize(18).text(`${eventLog.artist.firstName} ${eventLog.artist.lastName} currently isn't signed by a label.`, {align: 'left'}).moveDown(2);

  document.font('Helvetica-Bold').fontSize(20).text('Album', {align: 'center'});
  eventLog.song.album
    ? document.font('Helvetica').fontSize(18).text(`Newly released song is a part of ${eventLog.artist.firstName}'s latest album - ${eventLog.song.album.name}.`, {align: 'left'}).moveDown(3)
    : document.font('Helvetica').fontSize(18).text(`Newly released song isn't a part of ${eventLog.artist.firstName}'s latest album yet. It stands alone as a single`, {align: 'left', bottom: 100}).moveDown(3);


  document.font('Helvetica').fontSize(18).text(`Date: ${new Date(eventLog.createdAt).toLocaleDateString()}`, {align: 'right'});

  document.end();

  return new Promise(resolve => document.on('end', () => resolve(writer.toBuffer())))
};
