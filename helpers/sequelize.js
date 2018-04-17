const Promise = require('bluebird');

const addTransactionsBehaviour = sequelize => {
  sequelize.continueTransaction = (options = {}, callback) => {
    if (options.transaction) return Promise.resolve(callback(options.transaction));
    if (options.transaction === null) return Promise.resolve(callback(options.transaction));

    options.transactionPromise = sequelize.transaction(t => {
      options.transaction = t;
      return callback(t);
    });

    return options.transactionPromise;
  }
};

module.exports = {
  addTransactionsBehaviour
};
