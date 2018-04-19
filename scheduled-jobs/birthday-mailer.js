const schedule = require('node-schedule');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');

const emailCongratulation = schedule.scheduleJob({hour: 13}, () => {
  const currentDate = new Date();

  return models.User.find({
    where: {
      [Op.and]: [
        Sequelize.literal(`EXTRACT(MONTH FROM "birthDate") = ${currentDate.getMonth() + 1}`),
        Sequelize.literal(`EXTRACT(DAY FROM "birthDate") = ${currentDate.getDate()}`)
      ]
    }
  })
  .then(users => console.log(users))
});