const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { upperFirst: _upperFirst, reduce: _reduce } = require('lodash');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const db = {};
const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter(directoryItem => (directoryItem.length > 0 && directoryItem.indexOf('.') !== 0 && directoryItem !== basename))
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
  fs.readdirSync(__dirname)
    .filter(directoryItem => (directoryItem.length > 0 && directoryItem.indexOf('.') !== 0 && directoryItem !== basename))
    .forEach(directoryItem => {
      const methods = fs.existsSync(path.join(__dirname, `${directoryItem}/methods/index.js`))
        ? require(path.join(__dirname, `${directoryItem}/methods/index.js`))
        : null;

      if (methods) {
        const modelName = directoryItem
          .split('-')
          .filter(modelNamePart => modelNamePart !== '-')
          .map(modelNamePart => _upperFirst(modelNamePart))
          .join('');

        Object.assign(db[modelName], methods);
      }
    });
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
