const bCrypt = require('bcrypt');
const saltRounds = 5;

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   const userPasswords = [];
    ['password1', 'password2', 'passwords3'].forEach((password) => {
        userPasswords.push(bCrypt.hashSync(password, saltRounds));
    });
    return queryInterface.bulkInsert('users', [{
      id: 'e9649888-440e-4cc7-8832-e34df98fbaa1',
      firstName: 'First FirstName',
      lastName: 'First LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      birthDate: new Date(),
      password: userPasswords[0],
      email: 'firstUser@testemail.com',
      roleId: 'e9649888-440e-4cc7-8832-e34df98fd1b1',
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbaa2',
      firstName: 'Second FirstName',
      lastName: 'Second LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      birthDate: new Date(),
      password: userPasswords[1],
      email: 'secondUser@testemail.com',
      roleId: 'e9649888-440e-4cc7-8832-e34df98fd1b2',
    },
    {
      id: 'e9649888-440e-4cc7-8832-e34df98fbaa3',
      firstName: 'Third FirstName',
      lastName: 'Third LastName',
      createdAt: new Date(),
      updatedAt: new Date(),
      birthDate: new Date(),
      password: userPasswords[2],
      email: 'thirdUser@testemail.com',
      roleId: 'e9649888-440e-4cc7-8832-e34df98fd1b2',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
