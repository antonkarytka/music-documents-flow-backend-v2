const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureAdmin } = require('../../access-control');

router.get('/', [
  (req, res) => {
    return models.User.fetch({...req.query})
    .then(users => res.status(200).json(users))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:userId', [
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.fetchById(req.params.albumId)
    .then(album => res.status(200).json(album))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/login', [
  checkSchema(VALIDATION_SCHEMAS.LOG_IN),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.logIn(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
  },
]);


router.post('/signup', [
  checkSchema(VALIDATION_SCHEMAS.SIGN_UP),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.signUp(req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json(err))
  }
]);


router.post('/send-emails', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.SEND_EMAILS),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.sendEmails(req.body)
    .then(result => res.status(200).json(result))
    .catch(err => res.status(400).json(err))
  }
]);


router.put('/', [
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.updateOne({id: req.body.id}, req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.delete('/:userId', [
  checkSchema(VALIDATION_SCHEMAS.DELETE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.deleteOne({id: req.params.userId}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);



module.exports = router;