const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureUser, ensureAdmin } = require('../../access-control');


router.get('/', [
  ensureUser,
  (req, res) => {
    return models.SongListeningStatistics.fetch({...req.query})
    .then(songListeningStatistics => res.status(200).json(songListeningStatistics))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/songs/:songId', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_STATISTICS_BY_SONG_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.SongListeningStatistics.fetchStatisticsBySongId(req.params.songId)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/songs/:songId/latest', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_STATISTICS_BY_SONG_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.SongListeningStatistics.fetchLatestStatisticsBySongId(req.params.songId)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/songs', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.SongListeningStatistics.createOne(req.body)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


module.exports = router;