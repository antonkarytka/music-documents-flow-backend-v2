const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');


router.get('/', [
  (req, res) => {
    return models.Song.fetchAll()
    .then(songs => res.status(200).json(songs))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:songId', [
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Song.fetchById(req.params.songId)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/', [
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Song.createOne(req.body)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.put('/', [
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Song.updateOne({id: req.body.id}, req.body)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.delete('/', [
  checkSchema(VALIDATION_SCHEMAS.DELETE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Song.deleteOne({id: req.body.id}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);


module.exports = router;