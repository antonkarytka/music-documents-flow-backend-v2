const express = require('express');
const router = express.Router();

router.use('/artists', require('./artists'));
router.use('/labels', require('./labels'));

module.exports = router;
