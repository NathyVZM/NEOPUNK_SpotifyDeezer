// Artist.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ArtistSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

module.exports = mongoose.model('Artist', ArtistSchema, 'artista');