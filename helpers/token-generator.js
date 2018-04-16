const jwt = require('jsonwebtoken');
const secret = require('../config/config').secret;

const generateToken = userId => jwt.sign({userId}, secret, {expiresIn: '24 hours'});

module.exports = generateToken;