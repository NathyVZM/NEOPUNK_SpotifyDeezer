// Playlist.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
    title: { type: String, require: true},
    description: { type: String, require: true},
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    canciones: [{
        type: Schema.Types.ObjectId,
        ref: 'Song',
    }]
});

module.exports = mongoose.model('Playlist', PlaylistSchema, 'playlist');