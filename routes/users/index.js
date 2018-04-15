const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const passport = require('../../helpers/passport');


router.get('/', [
  (req, res) => {
    return models.User.fetchAll()
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
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/signup', [
  checkSchema(VALIDATION_SCHEMAS.SIGN_UP),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.User.signUp({id: req.body.id}, req.body)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


module.exports = router;