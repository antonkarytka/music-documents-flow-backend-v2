const Promise = require('bluebird');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../models');
const mailerConfig = require('../config/config').mailer;


const schenduleBirthdayEmailing = () => schedule.scheduleJob({seconds: 10}, () => {
  const currentDate = new Date();

  return models.User.findAll({
    where: {
      [Op.and]: [
        Sequelize.literal(`EXTRACT(MONTH FROM "birthDate") = ${currentDate.getMonth() + 1}`),
        Sequelize.literal(`EXTRACT(DAY FROM "birthDate") = ${currentDate.getDate() - 1}`)
      ]
    }
  })
  .then((users = []) => {
    if (users.length) {
      const transporter = nodemailer.createTransport({
        service: mailerConfig.service,
        auth: {
          user: mailerConfig.user,
          pass: mailerConfig.pass
        }
      });

      return Promise.each(users, user => {
        // TODO remove this. Used for testing.
        // nodemailer.createTestAccount((err, account) => {
        //   const transporter = nodemailer.createTransport({
        //     host: 'smtp.ethereal.email',
        //     port: 587,
        //     secure: false,
        //     auth: {
        //       user: account.user,
        //       pass: account.pass
        //     }
        //   });
        //
        //   const mailOptions = {
        //     from: '"Musicflow Documents" <antnkrtk@gmail.com>',
        //     to: `${user.email}`,
        //     subject: 'Happy Birthday!',
        //     html: '<b>Hello world?</b>'
        //   };
        //
        //   return transporter.sendMail(mailOptions, (error, info) => {
        //     if (error) return console.log(error);
        //
        //     console.log('Message sent: %s', info.messageId);
        //     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        //   });
        // });

        const mailOptions = {
          from: mailerConfig.user,
          to: user.email,
          subject: 'Happy Birthday!',
          html: '<p>Happy Birthday!</p>'
        };

        return transporter.sendMail(mailOptions, (err, info) => {
          if (err) return console.log(err);
          else console.log(info);
        });
      })
    }
  })
});


module.exports = schenduleBirthdayEmailing;