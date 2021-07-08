// cancionesFav.js

const express = require('express');
const router = express.Router();

const User = require('../models/User');
const { isAuthenticated } = require('../helpers/auth');

// VER CANCIONES FAVORITAS - GET
router.get('/favoritas', isAuthenticated, async (req, res) => {
    const favoritas = await User.find({_id: req.user.id})
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
    res.render('cancionesFav/mostrarFav', { favoritas });

});


// ANIADIR A CANCIONES FAVORITAS - POST
router.post('/favoritas/:id', isAuthenticated, async (req, res) => {
    const cancionID = req.params.id;
    console.log(cancionID);

    await User.findOneAndUpdate({_id: req.user.id}, {$push: {cancionesFavoritas: cancionID}});

    res.json({cancionID: cancionID});
});

module.exports = router;