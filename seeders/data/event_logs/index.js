const labels  = require('../labels/index')
const artists  = require('../artists/index')
const songs  = require('../songs/index')

module.exports = new Map(
    [
        [
            'GoodVibesPostmalone', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee1',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Good Vibes').id,
                    artistId: artists.get('Postmalone').id
                })
            }
        ],
        [
            'GoodVibesCudi', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee2',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Good Vibes').id,
                    artistId: artists.get('Kid cudi').id
                }), 
            }
        ],
        [
            'NiceLabelHer', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee3',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'LABEL_SIGNED_ARTIST',
                data: JSON.stringify({
                    labelId: labels.get('Nice Label').id,
                    artistId: artists.get('Her').id
                }),
            }
        ],
        [
            'LanaUltraviolence', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee4',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Ultraviolence').id,
                    artistId: artists.get('Lana del rey').id
                }),
            }
        ],
        [
            'FKAPendulum', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee5',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Pendulum').id,
                    artistId: artists.get('FKA Twigs').id
                }),
            }
        ],
        [
            'XXCrystalised', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee6',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Crystalised').id,
                    artistId: artists.get('The xx').id
                }),
            }
        ],
        [
            'DrakePassionfruit', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee7',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Passionfruit').id,
                    artistId: artists.get('Drake').id
                }),
            }
        ],
        [
            'MigosStirFry', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbee8',
                createdAt: new Date(),
                updatedAt: new Date(),
                type: 'ARTIST_NEW_SONG',
                data: JSON.stringify({
                    songId: songs.get('Stir Fry').id,
                    artistId: artists.get('Migos').id
                }),
            }
        ]
    ]
);