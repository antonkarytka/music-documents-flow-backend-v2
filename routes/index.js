const express = require('express');
const router = express.Router();

router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/event-logs', require('./event-logs'));
router.use('/labels', require('./labels'));
router.use('/songs', require('./songs'));

module.exports = router;
