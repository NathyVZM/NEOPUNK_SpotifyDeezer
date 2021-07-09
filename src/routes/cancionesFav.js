// cancionesFav.js

const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { isAuthenticated } = require('../helpers/auth');

// VER CANCIONES FAVORITAS - GET
router.get('/favoritas', isAuthenticated, async (req, res) => {
    const favoritas = await User.find({ _id: req.user.id })
        .populate({
            path: 'cancionesFavoritas',
            populate: {
                path: 'musicArtist',
                populate: {
                    path: 'artist'
                }
            }
        });

    console.log(favoritas);
    res.render('cancionesFav/mostrarFav', {
        favoritas,
        title: 'NEOPUNK - Canciones Favoritas',
        titlepage: 'Canciones Favoritas',
        textpage: 'Escucha tu playlist de canciones favoritas',
        imgpage: '/assets/icons/loveIconEggplant.svg',
        username: req.user.username
    });

});


// ANIADIR A CANCIONES FAVORITAS - POST
router.post('/favoritas/:id', isAuthenticated, async (req, res) => {
    const cancionID = req.params.id;
    console.log('Cancion ID: ');
    console.log(cancionID);

    await User.findOneAndUpdate({ _id: req.user.id }, { $push: { cancionesFavoritas: cancionID } });

    res.json({ cancionID: cancionID });
    //res.redirect('/buscar/canciones')
});

module.exports = router;