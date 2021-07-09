// buscar.js

const express = require('express');
const router = express.Router();

const Song = require('../models/Song');
const Playlist = require('../models/Playlist');
const { isAuthenticated } = require('../helpers/auth');

// BUSCAR CANCIONES - GET
router.get('/buscar', isAuthenticated, (req, res) => {
    res.render('buscar/searchSong', { 
        title: 'NEOPUNK - Buscar Canciones', 
        titlepage: 'Buscar',
        textpage: 'Busca las canciones que desees',
        imgpage: '/assets/icons/searchIconEggplant.svg',
        username: req.user.username
    });
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
    res.render('buscar/searchSong', { 
        canciones,
        title: 'NEOPUNK - Buscar Canciones',
        titlepage: 'Buscar',
        textpage: 'Busca las canciones que desees',
        imgpage: '/assets/icons/searchIconEggplant.svg',
        username: req.user.username
    })

})

module.exports = router;