const songs = require('../songs/index')

module.exports = new Map(
    [
        [
            'SongListeningStatistics1', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa1',
                songId: songs.get('First Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 1234,
                googlePlayMusic: 2345,
                yandexMusic: 3456,
                spotify: 124,
            }
        ],
        [
            'SongListeningStatistics2', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa2',
                songId: songs.get('First Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 2232,
                googlePlayMusic: 2347,
                yandexMusic: 3458,
                spotify: 135,
            }
        ],
        [
            'SongListeningStatistics3', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa3',
                songId: songs.get('Second Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 2232,
                googlePlayMusic: 2347,
                yandexMusic: 3458,
                spotify: 135,
            }
        ],
        [
            'SongListeningStatistics4', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa4',
                songId: songs.get('Third Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 2232,
                googlePlayMusic: 2347,
                yandexMusic: 3458,
                spotify: 135,
            }
        ],
        [
            'SongListeningStatistics5', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa5',
                songId: songs.get('Fourth Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 2232,
                googlePlayMusic: 2347,
                yandexMusic: 3458,
                spotify: 135,
            }
        ],
        [
            'SongListeningStatistics6', {
                id: 'e9649888-440e-4cc7-8832-e34df98ffaa6',
                songId: songs.get('Fourth Song').id,
                createdAt: new Date(),
                updatedAt: new Date(),
                appleMusic: 2243,
                googlePlayMusic: 2349,
                yandexMusic: 3438,
                spotify: 165,
            }
        ]
    ]
);