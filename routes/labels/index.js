const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureUser, ensureAdmin } = require('../../access-control');


router.get('/', [
  ensureUser,
  (req, res) => {
    return models.Label.fetch({...req.query})
    .then(labels => res.status(200).json(labels))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:labelId', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Label.fetchById(req.params.labelId)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Label.createOne(req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.put('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Label.updateOne({id: req.body.id}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);


router.delete('/:labelId', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.DELETE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Label.deleteOne({id: req.params.labelId}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);


module.exports = router;