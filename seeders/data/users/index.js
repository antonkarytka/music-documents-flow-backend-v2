const roles  = require('../roles/index')
const bCrypt = require('bcrypt');
const saltRounds = 5;
const userPasswords = [];


['password1', 'password2', 'passwords3'].forEach((password) => {
    userPasswords.push(bCrypt.hashSync(password, saltRounds));
});

module.exports = new Map(
    [
        [
            'First User', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa1',
                firstName: 'Uladzislau',
                lastName: 'Kirichenka',
                createdAt: new Date(),
                updatedAt: new Date(),
                birthDate: new Date(),
                password: userPasswords[0],
                email: 'firstUser@testemail.com',
                roleId: roles.get('Admin').id,
            }
        ],
        [
            'Second User', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa2',
                firstName: 'Andrew',
                lastName: 'Calyatka',
                createdAt: new Date(),
                updatedAt: new Date(),
                birthDate: new Date(),
                password: userPasswords[1],
                email: 'secondUser@testemail.com',
                roleId: roles.get('User').id, 
            }
        ],
        [
            'Third User', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa3',
                firstName: 'Anton',
                lastName: 'Karytka',
                createdAt: new Date(),
                updatedAt: new Date(),
                birthDate: new Date(),
                password: userPasswords[2],
                email: 'thirdUser@testemail.com',
                roleId: roles.get('User').id,
            }
        ]
    ]
);