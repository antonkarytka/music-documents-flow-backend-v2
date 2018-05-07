const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureUser, ensureAdmin } = require('../../access-control');


router.get('/', [
  ensureUser,
  (req, res) => {
    return models.EventLog.fetch({...req.query})
    .then(eventLogs => res.status(200).json(eventLogs))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:eventLogId', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.EventLog.fetchById(req.params.eventLogId)
    .then(eventLog => res.status(200).json(eventLog))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.EventLog.createOne(req.body)
    .then(eventLog => res.status(200).json(eventLog))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.put('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.EventLog.updateOne({id: req.body.id}, req.body)
    .then(eventLog => res.status(200).json(eventLog))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


module.exports = router;