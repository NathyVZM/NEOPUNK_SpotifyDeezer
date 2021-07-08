// paginaPrincipal.js

const express = require('express');
const router = express.Router();

const User = require('../models/User');

const passport = require('passport');

// PAGINA PRINCIPAL - GET
router.get('/', (req, res) => {
    res.render('principal/principal', { layout: false });
});


// REGISTRO - GET
router.get('/registro', (req, res) => {
    res.render('principal/registro', { title: 'NEOPUNK - Registro', layout: 'registro_login' });
});


// REGISTRO - POST
router.post('/registro', async (req, res) => {
    const { name, lastname, username, password } = req.body;
    
    const nuevoUsuario = new User({ name, lastname, username, password });
    nuevoUsuario.password = await nuevoUsuario.encryptPassword(password);
    await nuevoUsuario.save();
    res.redirect('/login');
});


// LOGIN - GET
router.get('/login', (req, res) => {
    res.render('principal/login', { title: 'NEOPUNK - Login', layout: 'registro_login' });
});


// LOGIN - POST
router.post('/login', passport.authenticate('local', {
    successRedirect: '/playlist',
    failureRedirect: '/login',
    failureFlash: true
}));


// LOGOUT - GET
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/')
});


module.exports = router;

