const jwt = require('jsonwebtoken');


function generateToken(req, res, next) {
  req.token = jwt.sign({id: req.user.id,}, 'false mirror', {expiresIn: '365 days'});
  next();
}

module.exports = generateToken;