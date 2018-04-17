const albums  = require('../albums/index')

module.exports = new Map(
    [
        [
            'First Song', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1d1',
                name: 'First Song',
                createdAt: new Date(),
                updatedAt: new Date(),
                albumId: albums.get('First Album').id
            }
        ],
        [
            'Second Song', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1d2',
                name: 'Second Song',
                createdAt: new Date(),
                updatedAt: new Date(),
                albumId: albums.get('First Album').id
            }
        ],
        [
            'Third Song', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1d3',
                name: 'Third Song',
                createdAt: new Date(),
                updatedAt: new Date(),
                albumId: albums.get('First Album').id
            }
        ],
        [
            'Fourth Song', {
                id: 'e9649888-440e-4cc7-8832-e34df98fb1d4',
                name: 'Fourth Song',
                createdAt: new Date(),
                updatedAt: new Date(),
                albumId: albums.get('Second Album').id
            }
        ]
    ]
);