// artista.js

const express = require('express');
const router = express.Router();

const Artist = require('../models/Artist');
const MusicArtist = require('../models/MusicArtist');
const Song = require('../models/Song');
const { isAuthenticated } = require('../helpers/auth');

// CREAR ARTISTA - GET
router.get('/artista/crear', isAuthenticated, (req, res) => {
    res.render('artista/crearArtista', {
        title: 'NEOPUNK - Crear Artista',
        titlepage: 'Crear Artista',
        textpage: 'Crea el perfil de tus artistas preferidos',
        imgpage: '/assets/icons/artistIconEggplant.svg',
        username: req.user.username
    });
});


// CREAR ARTISTA - POST
router.post('/artista/crear', isAuthenticated, async (req, res) => {
    const { name, description } = req.body;

    const nuevoArtista = new Artist({ name, description });
    await nuevoArtista.save();
    res.redirect('/artista/musica');
})


// CREAR MUSICA - GET
router.get('/artista/musica', isAuthenticated, async (req, res) => {
    const artistas = await Artist.find();
    res.render('artista/crearMusica', {
        title: 'NEOPUNK - Crear Musica',
        artistas,
        titlepage: 'Crear musica',
        textpage: 'Aniade a la app tu musica favorita',
        imgpage: '/assets/icons/albumIconEggplant.svg',
        username: req.user.username
    });
});


// CREAR MUSICA - POST
router.post('/artista/musica', isAuthenticated, async (req, res) => {
    const { title, date, typeAlbum, artist, titlesong } = req.body;

    const nuevaMusica = new MusicArtist({ title, date, typeAlbum, artist });
    await nuevaMusica.save();

    const musicArtist = nuevaMusica._id;

    if (typeof titlesong === "string") {
        const nuevaCancion = new Song({ titlesong, musicArtist });
        await nuevaCancion.save();
    } else {
        for (let i = 0; i < titlesong.length; i++) {
            let titulo = titlesong[i];

            const nuevaCancion = new Song({ titlesong: titulo, musicArtist });
            await nuevaCancion.save();
        }
    }
    res.redirect('/artista/crear');
})

module.exports = router;