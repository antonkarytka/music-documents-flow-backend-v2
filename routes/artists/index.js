const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureUser, ensureAdmin } = require('../../access-control');


router.get('/', [
  ensureUser,
  (req, res) => {
    return models.Artist.fetch({...req.query})
    .then(artists => res.status(200).json(artists))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:artistId', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.fetchById(req.params.artistId)
    .then(artist => res.status(200).json(artist))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:artistId/pdf', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.createDocument({...req.params, type: 'pdf'})
    .then(document => res.type('application/pdf').status(200).send(document))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:artistId/xml', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.createDocument({...req.params, type: 'xml'})
    .then(document => res.type('application/xml').status(200).send(document))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:artistId/xlsx', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.createDocument({...req.params, type: 'xlsx'})
    .then(document => {
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-disposition', 'attachment; filename=' + 'out.xlsx');
      res.status(200).send(document);
    })
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.createOne(req.body)
    .then(artist => res.status(200).json(artist))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.put('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.updateOne({id: req.body.id}, req.body)
    .then(artist => res.status(200).json(artist))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.delete('/:artistId', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.DELETE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Artist.deleteOne({id: req.params.artistId}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);


module.exports = router;