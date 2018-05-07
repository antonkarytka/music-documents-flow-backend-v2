require('bluebird');

const models = require('../../index');
const { sequelize } = models;
const { MIN_UPDATED_STATISTICS_COUNT, MAX_UPDATED_STATISTICS_COUNT } = require('../constants');


const fetchStatisticsBySongId = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.SongListeningStatistics.findAll(
      {
        where: {
          songId: id
        },
        order: [
          ['createdAt', 'DESC']
        ],
        ...options
      }
    )
  })
};


const fetchLatestStatisticsBySongId = (id, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.SongListeningStatistics.findOne(
      {
        where: {
          songId: id
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
  options.limit = Number(options.limit) || 1000;
  options.offset = Number(options.offset) || 0;

  return sequelize.continueTransaction(options, () => {
    return models.SongListeningStatistics.findAndCountAll(options)
    .then(songListeningStatistics => ({data: songListeningStatistics.rows, total: songListeningStatistics.count}))
  })
};

const createOne = (content, options = {}) => {
  return sequelize.continueTransaction(options, () => {
    return models.SongListeningStatistics.findOne(
      {
        where: {
          songId: content.songId,         
        },
        order:[
          ['createdAt', 'DESC']
        ]
      }
    ).then(mostRecentStatistics => {
      content = {
        ...createNewStatistics(content, mostRecentStatistics)
      }

      return models.SongListeningStatistics.create(content, options)
    })
  })
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function createNewStatistics(content, statistics) {
  return {
    songId: content.songId,
    appleMusic: +statistics.appleMusic + getRandomInt(MIN_UPDATED_STATISTICS_COUNT,
      MAX_UPDATED_STATISTICS_COUNT),
    googlePlayMusic: +statistics.googlePlayMusic + getRandomInt(MIN_UPDATED_STATISTICS_COUNT,
      MAX_UPDATED_STATISTICS_COUNT),
    yandexMusic: +statistics.yandexMusic + getRandomInt(MIN_UPDATED_STATISTICS_COUNT,
      MAX_UPDATED_STATISTICS_COUNT),
    spotify: +statistics.spotify + getRandomInt(MIN_UPDATED_STATISTICS_COUNT,
      MAX_UPDATED_STATISTICS_COUNT),
  }
}

module.exports = {
  fetchStatisticsBySongId,
  fetchLatestStatisticsBySongId,
  fetch,
  createOne
};