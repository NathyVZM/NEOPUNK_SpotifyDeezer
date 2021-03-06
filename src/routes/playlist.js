// playlist.js

const express = require('express');
const router = express.Router();

const Playlist = require('../models/Playlist');
const { isAuthenticated } = require('../helpers/auth');


// CREAR PLAYLIST - GET
router.get('/playlist/crear', isAuthenticated, (req, res) => {
    res.render('playlist/crearPlaylist', { 
        title: 'NEOPUNK - Crear playlist',
        titlepage: 'Crear Playlist',
        textpage: 'Crea tus playlists preferidas',
        imgpage: '/assets/icons/playlistIconEggplant.svg',
        username: req.user.username
    });
});


// CREAR PLAYLIST - POST
router.post('/playlist/crear', isAuthenticated, async (req, res) => {
    const { title, description } = req.body;

    const nuevaPlaylist = new Playlist({ title, description });
    nuevaPlaylist.user = req.user.id;
    await nuevaPlaylist.save();

    res.redirect('/playlist');
});


// VER MIS PLAYLISTS - GET
router.get('/playlist', isAuthenticated, async (req, res) => {
    const playlists = await Playlist.find({ user: req.user.id });
    res.render('playlist/misPlaylists', {
        title: "NEOPUNK - Mis playlists",
        playlists, username: req.user.username,
        titlepage: 'Musica',
        textpage: 'Escucha las playlists que has creado',
        imgpage: '/assets/icons/musicIconEggplant.svg',
        length: playlists.length
    });
})


// ANIADIR CANCION A PLAYLIST - GET
router.get('/playlist/cancion', isAuthenticated, async (req, res) => {
    const playlists = await Playlist.find({ user: req.user.id });
    res.json(playlists);
})


// ANIADIR CANCION A PLAYLIST - POST
router.post('/playlist/cancion', isAuthenticated, async (req, res) => {
    console.log(req.body);
    const cancionID = req.body.cancionID;
    const playlistID = req.body.playlistID;

    await Playlist.findOneAndUpdate({ _id: playlistID }, { $push: { canciones: cancionID } })
})

// VER CANCIONES DE PLAYLIST - GET
router.get('/playlist/:id', isAuthenticated, async (req, res) => {
    const playlistCanciones = await Playlist.find({ user: req.user.id, _id: req.params.id })
        .populate({
            path: 'canciones',
            populate: {
                path: 'musicArtist',
                populate: {
                    path: 'artist'
                }
            }
        });

    console.log(playlistCanciones);
    console.log(playlistCanciones[0].canciones.length);

    res.render('playlist/verPlaylist', {
        playlistCanciones,
        title: 'NEOPUNK - Mis playlist',
        titlepage: playlistCanciones[0].title,
        textpage: playlistCanciones[0].description,
        imgpage: '/assets/icons/playlistIconEggplant.svg',
        username: req.user.username,
        length: playlistCanciones[0].canciones.length
    });
});


module.exports = router;