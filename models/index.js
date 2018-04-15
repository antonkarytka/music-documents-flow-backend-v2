const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { lowerFirst: _lowerFirst } = require('lodash');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
.filter(directoryItem => (directoryItem.indexOf('.') !== 0) && (directoryItem !== basename))
.forEach(directoryItem => {
  const model = sequelize['import'](path.join(__dirname, `${directoryItem}/index.js`));
  db[model.name] = model;
});

// Establish relations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Add methods to models. Pull from execution to allow all models to be added to db object.
// As other models may also be used in this model's methods.
setTimeout(() => {
  Object.keys(db).forEach(modelName => {
    const methods = fs.existsSync(path.join(__dirname, `${_lowerFirst(modelName)}/methods/index.js`))
      ? require(path.join(__dirname, `${_lowerFirst(modelName)}/methods/index.js`))
      : null;

    Object.assign(db[modelName], methods);
  })
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
