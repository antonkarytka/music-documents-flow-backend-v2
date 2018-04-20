const Promise = require('bluebird');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');


const schenduleBirthdayEmailing = () => schedule.scheduleJob({hour: 13}, () => {
  const currentDate = new Date();

  return models.User.findAll({
    where: {
      [Op.and]: [
        Sequelize.literal(`EXTRACT(MONTH FROM "birthDate") = ${currentDate.getMonth() + 1}`),
        Sequelize.literal(`EXTRACT(DAY FROM "birthDate") = ${currentDate.getDate()}`)
      ]
    }
  })
  .then((users = []) => users.length && Promise.each(users, user => {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      const mailOptions = {
        from: '"Musicflow Documents" <antnkrtk@gmail.com>',
        to: `${user.email}`,
        subject: 'Happy Birthday!',
        html: '<b>Hello world?</b>'
      };

      return transporter.sendMail(mailOptions, (error, info) => {
        if (error) return console.log(error);

        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
    });
  }))
});


module.exports = schenduleBirthdayEmailing;