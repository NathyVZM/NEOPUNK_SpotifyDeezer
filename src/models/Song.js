// Song.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const SongSchema = new Schema({
    titlesong: { type: String, require: true },
    musicArtist: {
        type: Schema.Types.ObjectId,
        ref: 'MusicArtist'
    }
});

module.exports = mongoose.model('Song', SongSchema, 'cancion');