const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//POST /api/auth/register

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const existingUsername = await User.findOne({ username });
        if(existingUsername) {
            return res.status(409).json({ message: 'Username already in use' });
        }

        const existingEmail = await User.findOne({ email });
        if(existingEmail) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, passwordHash});

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error'});
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            return res.status(400).json({ message: 'Missing username or password' });
        }

        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if(!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;