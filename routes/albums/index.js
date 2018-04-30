const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');


router.get('/', [
  (req, res) => {
    return models.Album.fetch({...req.query})
    .then(albums => res.status(200).json(albums))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/top/pdf', [
  (req, res) => {
    return models.Album.createDocument({generatorType: 'topAlbums', documentType: 'pdf'})
    .then(document => res.type('application/pdf').status(200).send(document))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/top/xml', [
  (req, res) => {
    return models.Album.createDocument({generatorType: 'topAlbums', documentType: 'xml'})
    .then(document => res.type('application/xml').status(200).send(document))
    // .catch(err => res.status(400).json({errors: err }))
    .catch(err => console.log(err));
  }
]);

router.get('/top/xlsx', [
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