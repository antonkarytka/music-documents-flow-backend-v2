const express = require('express');
const router = express.Router();
const { checkSchema, validationResult } = require('express-validator/check');

const models = require('../../models');
const VALIDATION_SCHEMAS = require('./validation-schemas');


router.get('/', [
  (req, res) => {
    return models.AlbumSale.fetchAll()
    .then(albumSales => res.status(200).json(albumSales))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/albums/:albumId', [
  checkSchema(VALIDATION_SCHEMAS.FETCH_SALES_BY_ALBUM_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.AlbumSale.fetchSalesByAlbumId(req.params.albumId)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.get('/albums/:albumId/latest', [
  checkSchema(VALIDATION_SCHEMAS.FETCH_SALES_BY_ALBUM_ID),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.AlbumSale.fetchLatestSaleByAlbumId(req.params.albumId)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


router.post('/albums', [
  checkSchema(VALIDATION_SCHEMAS.CREATE_ONE),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.mapped() });

    return models.AlbumSale.createOne(req.body)
    .then(song => res.status(200).json(song))
    .catch(err => res.status(400).json({errors: err }))
  }
]);


module.exports = router;