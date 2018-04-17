const labels  = require('../labels/index')
const artists  = require('../artists/index')
const songs  = require('../songs/index')

module.exports = new Map(
    [
        [
            'Label3Artist1', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee1',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Third Label').id,
                    artistId: artists.get('First Artist').id
                })
            }
        ],
        [
            'Label4Artist2', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee2',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Fourth Label').id,
                    artistId: artists.get('Second Artist').id
                }), 
            }
        ],
        [
            'Label2Artist3', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee3',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Second Label').id,
                    artistId: artists.get('Third Artist').id
                }),
            }
        ],
        [
            'Artist1Song1', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee4',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('First Song').id,
                    artistId: artists.get('First Artist').id
                }),
            }
        ],
        [
            'Artist2Song2', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee5',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Second Song').id,
                    artistId: artists.get('Second Artist').id
                }),
            }
        ],
        [
            'Artist2Song1', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee6',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('First Song').id,
                    artistId: artists.get('Second Artist').id
                }),
            }
        ],
        [
            'Artist3Song3', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee7',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Third Song').id,
                    artistId: artists.get('Third Artist').id
                }),
            }
        ],
        [
            'Artist3Song4', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee8',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Fourth Song').id,
                    artistId: artists.get('Third Artist').id
                }),
            }
        ]
    ]
);