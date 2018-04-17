const artists  = require('../artists/index')
const songs  = require('../songs/index')

module.exports = new Map(
    [
        [
            'Song1Artist1', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbbb1',
                artistId: artists.get('First Artist').id,
                songId: songs.get('First Song').id,
            }
        ],
        [
            'Song2Artist2', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbbb2',
                artistId: artists.get('Second Artist').id,
                songId: songs.get('Second Song').id,
            }
        ],
        [
            'Song1Artist2', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbbb3',
                artistId: artists.get('Second Artist').id,
                songId: songs.get('First Song').id,
            }
        ],
        [
            'Song3Artist3', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbbb4',
                artistId: artists.get('Third Artist').id,
                songId: songs.get('Third Song').id,
            }
        ],
        [
            'Song4Artist3', {
                id: 'e9649888-440e-4cc7-8832-e34df98fbbb5',
                artistId: artists.get('Third Artist').id,
                songId: songs.get('Fourth Song').id,
            }
        ]
    ]
);