const artists  = require('../artists/index')

module.exports = new Map(
    [
        [
            'First Album', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1b1',
                name: 'First Album',
                createdAt: new Date(),
                updatedAt: new Date(),
                artistId: artists.get('First Artist').id
            }
        ],
        [
            'Second Album', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1b2',
                name: 'Second Album',
                createdAt: new Date(),
                updatedAt: new Date(),
                artistId: artists.get('Second Artist').id
            }
        ],
        [
            'Third Album', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1b3',
                name: 'Third Album',
                createdAt: new Date(),
                updatedAt: new Date(),
                artistId: artists.get('Third Artist').id
            }
        ]
    ]
);