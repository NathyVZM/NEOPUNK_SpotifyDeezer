// buscar.js

const express = require('express');
const router = express.Router();

const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const { isAuthenticated } = require('../helpers/auth');

// BUSCAR CANCIONES - GET
router.get('/buscar', isAuthenticated, (req, res) => {
    res.render('buscar/searchSong', { title: 'NEOPUNK - Buscar Canciones' });
});

// BUSCAR CANCIONES - POST
router.post('/buscar/canciones', isAuthenticated, async (req, res) => {
    const { title } = req.body;

    const canciones = await Song.find({ titlesong: {$regex: title, $options: "$i"}}).lean()
    .populate({
        path: 'musicArtist',
        populate: {
            path: 'artist',
        }
    });
    console.log(canciones);
    res.render('buscar/buscarCanciones', { canciones })

})

module.exports = router;