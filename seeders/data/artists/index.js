const labels  = require('../labels/index')

module.exports = new Map(
    [
        [
            'First Artist', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1a1',
                firstName: 'First FirstName',
                lastName: 'First LastName',
                createdAt: new Date(),
                updatedAt: new Date(),
                labelId: labels.get('Third Label').id
            }
        ],
        [
            'Second Artist', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1a2',
                firstName: 'Second FirstName',
                lastName: 'Second LastName',
                createdAt: new Date(),
                updatedAt: new Date(),
                labelId: labels.get('Fourth Label').id
            }
        ],
        [
            'Third Artist', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1a3',
                firstName: 'Third FirstName',
                lastName: 'Third LastName',
                createdAt: new Date(),
                updatedAt: new Date(),
                labelId: labels.get('Second Label').id
            }
        ]
    ]
);