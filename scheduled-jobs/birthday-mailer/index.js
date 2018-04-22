const Promise = require('bluebird');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const pug = require('pug');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const models = require('../../models/index');
const { mailer: mailerConfig } = require('../../config/config');


const scheduleBirthdayEmailing = () => schedule.scheduleJob({hour: 13}, () => {
  const currentDate = new Date();

  return models.User.findAll({
    where: {
      [Op.and]: [
        Sequelize.literal(`EXTRACT(MONTH FROM "birthDate") = ${currentDate.getMonth() + 1}`),
        Sequelize.literal(`EXTRACT(DAY FROM "birthDate") = ${currentDate.getDate()}`)
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
        const compiledCongratulationsView = pug.compileFile(`${__dirname}/public/birthday-congratulation-view.pug`);

        const mailOptions = {
          from: mailerConfig.user,
          to: user.email,
          subject: 'Happy Birthday!',
          html: compiledCongratulationsView({
            name: user.firstName,
            firstName: user.firstName,
            lastName: user.lastName
          })
        };

        return transporter.sendMail(mailOptions, (err, info) => {
          if (err) return console.log(err);
          else console.log(info);
        });
      })
    }
  })
});


module.exports = scheduleBirthdayEmailing;