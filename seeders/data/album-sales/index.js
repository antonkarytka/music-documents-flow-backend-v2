const albums  = require('../albums/index')

module.exports = new Map(
    [
        [
            'AlbumSales1', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa1',
                albumId: albums.get('First Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 5432
            }
        ],
        [
            'AlbumSales2', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa2',
                albumId: albums.get('Second Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 6924,
            }
        ],
        [
            'AlbumSales3', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa3',
                albumId: albums.get('Third Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 6341,
            }
        ],
        [
            'AlbumSales4', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa4',
                albumId: albums.get('Second Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 6924,
            }
        ],
        [
            'AlbumSales5', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa5',
                albumId: albums.get('Second Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 6924,
            }
        ],
        [
            'AlbumSales6', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbaa6',
                albumId: albums.get('Third Album').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                sales: 6924,
            }
        ]
    ]
);