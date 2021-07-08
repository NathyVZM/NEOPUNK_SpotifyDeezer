// MusicArtist.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const MusicArtistSchema = new Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true},
    typeAlbum: { type: String, required: true},
    artist: {
        type: Schema.Types.ObjectId,
        ref: 'Artist'
    }
});

module.exports = mongoose.model('MusicArtist', MusicArtistSchema, 'musicaArtista');