const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');
const { ensureUser, ensureAdmin } = require('../../access-control');


router.get('/', [
  ensureUser,
  (req, res) => {
    return models.Album.fetch({...req.query})
    .then(albums => res.status(200).json(albums))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/top/pdf', [
  // ensureUser,
  (req, res) => {
    return models.Album.createDocument({generatorType: 'topAlbums', documentType: 'pdf'})
    .then(document => res.type('application/pdf').status(200).send(document))
    .catch(err => {
      console.log(err);
      res.status(400).json({errors: err })
    })
  }
]);


router.get('/top/xml', [
  // ensureUser,
  (req, res) => {
    return models.Album.createDocument({generatorType: 'topAlbums', documentType: 'xml'})
    .then(document => res.type('application/xml').status(200).send(document))
    // .catch(err => res.status(400).json({errors: err }))
    .catch(err => console.log(err));
  }
]);

router.get('/top/xlsx', [
  // ensureUser,
  (req, res) => {
    return models.Album.createDocument({generatorType: 'topAlbums', documentType: 'xlsx'})
    .then(document => {
      res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-disposition', 'attachment; filename=' + 'out.xlsx');
      res.status(200).send(document);
    })
    // .catch(err => res.status(400).json({errors: err }))
    .catch(err => console.log(err));
  }
]);


router.get('/:albumId', [
  ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.fetchById(req.params.albumId)
    .then(album => res.status(200).json(album))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:albumId/pdf', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.createDocument({...req.params, generatorType: 'singleAlbum', documentType: 'pdf'})
    .then(document => res.type('application/pdf').status(200).send(document))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:albumId/xml', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.createDocument({...req.params, generatorType: 'singleAlbum', documentType: 'xml'})
    .then(document => res.type('application/xml').status(200).send(document))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/:albumId/xlsx', [
  // ensureUser,
  checkSchema(VALIDATION_SCHEMAS.FETCH_BY_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.createDocument({...req.params, generatorType: 'singleAlbum', documentType: 'xlsx'})
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

    return models.Album.createOne(req.body)
    .then(album => res.status(200).json(album))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.put('/', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.UPDATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.updateOne({id: req.body.id}, req.body)
    .then(album => res.status(200).json(album))
    .catch(err => res.status(400).json({errors: err }))
  }
]);

router.delete('/:albumId', [
  ensureAdmin,
  checkSchema(VALIDATION_SCHEMAS.DELETE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.Album.deleteOne({id: req.params.albumId}, req.body)
    .then(label => res.status(200).json(label))
    .catch(err => res.status(400).json(err))
  }
]);


module.exports = router;