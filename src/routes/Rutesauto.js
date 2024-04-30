const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).send({ message: 'Usuario registrado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Error al registrar usuario' });
    }
});

// Ruta para autenticar el inicio de sesión
router.post('/login', passport.authenticate('local', { successRedirect: '/products', failureRedirect: '/login' }));

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/login');
});

// Ruta para autenticar con GitHub
router.get('/auth/github', passport.authenticate('github'));

// Callback de autenticación de GitHub
router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/products');
});

module.exports = router;
