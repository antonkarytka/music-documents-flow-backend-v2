require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const { MIN_UPDATED_SALES_COUNT, MAX_UPDATED_SALES_COUNT } = require('../constants');


const fetchSalesByAlbumId = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.AlbumSale.findAll(
      {
        where: {
          albumId: id
        },
        order: [
          ['createdAt', 'DESC']
        ],
        ...options
      }
    )
  })
};


const fetchLatestSaleByAlbumId = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.AlbumSale.findOne(
      {
        where: {
          albumId: id
        },
        order: [
          ['createdAt', 'DESC']
        ],
        ...options
      }
    )
  })
};


const fetch = (options = {}) => {
  options.where = {...options.where, ...options.params};
  options.limit = Number(options.limit) || 50;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.AlbumSale.findAndCountAll(options)
    .then(albumSales => ({data: albumSales.rows, total: albumSales.count}))
  })
};


const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.AlbumSale.findOne(
      {
        where: {
          albumId: content.albumId,         
        },
        order:[
          ['createdAt', 'DESC']
        ]
      }
    ).then(mostRecentSale => {
      content.sales = +mostRecentSale.sales + getRandomInt(MIN_UPDATED_SALES_COUNT,
        MAX_UPDATED_SALES_COUNT)
      return models.AlbumSale.create(content, options)
      }
    )
  })
};


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = {
  fetchSalesByAlbumId,
  fetchLatestSaleByAlbumId,
  fetch,
  createOne
};