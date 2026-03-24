const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { sendVerificationEmail } = require('../utils/email');

const router = express.Router();

const VERIFICATION_TOKEN_HOURS = 24;

const makeVerificationToken = () => crypto.randomBytes(32).toString('hex');
const hashToken = (token) =>
    crypto.createHash('sha256').update(token).digest('hex');

const buildVerificationUrl = (token) => {
    const clientBase =
        process.env.CLIENT_APP_URL ||
        process.env.CLIENT_ORIGIN?.split(',')[0]?.trim() ||
        'http://localhost:3000';

    return `${clientBase}/#/login?verifyToken=${token}`;
};

//POST /api/auth/register

router.post('/register', async (req, res) => {
    try {
        const username = req.body?.username?.trim();
        const email = req.body?.email?.trim().toLowerCase();
        const { password } = req.body;

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

        const rawToken = makeVerificationToken();
        const tokenHash = hashToken(rawToken);
        const expires = new Date(Date.now() + VERIFICATION_TOKEN_HOURS * 60 * 60 * 1000);

        const user = await User.create({
            username,
            email,
            passwordHash,
            isEmailVerified: false,
            emailVerificationTokenHash: tokenHash,
            emailVerificationExpires: expires,
        });

        const verificationUrl = buildVerificationUrl(rawToken);

        await sendVerificationEmail({
            to: user.email,
            username: user.username,
            verificationUrl,
        });

        res.status(201).json({
            message: 'Account created. Please check your email to verify your account.',
            requiresEmailVerification: true,
        });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ message: 'Server error'});
    }
});

//GET /api/auth/verify-email?token=...
router.get('/verify-email', async (req, res) => {
    try {
        const { token } = req.query;

        if (!token) {
            return res.status(400).json({ message: 'Verification token is required' });
        }

        const tokenHash = hashToken(token);

        const user = await User.findOne({
            emailVerificationTokenHash: tokenHash,
            emailVerificationExpires: { $gt: new Date() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired verification link' });
        }

        user.isEmailVerified = true;
        user.emailVerificationTokenHash = null;
        user.emailVerificationExpires = null;

        await user.save();

        res.json({ message: 'Email verified successfully. You can now log in.' });
    } catch (err) {
        console.error('Verify email error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//POST /api/auth/resend-verification
router.post('/resend-verification', async (req, res) => {
    try {
        const email = req.body?.email?.trim().toLowerCase();

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'No account found with that email' });
        }

        if (user.isEmailVerified) {
            return res.status(400).json({ message: 'Email is already verified' });
        }

        const rawToken = makeVerificationToken();
        const tokenHash = hashToken(rawToken);
        const expires = new Date(Date.now() + VERIFICATION_TOKEN_HOURS * 60 * 60 * 1000);

        user.emailVerificationTokenHash = tokenHash;
        user.emailVerificationExpires = expires;
        await user.save();

        const verificationUrl = buildVerificationUrl(rawToken);

        await sendVerificationEmail({
            to: user.email,
            username: user.username,
            verificationUrl,
        });

        res.json({ message: 'Verification email sent' });
    } catch (err) {
        console.error('Resend verification error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    try {
        const username = req.body?.username?.trim();
        const { password } = req.body;

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

        if (!user.isEmailVerified) {
            return res.status(403).json({
                message: 'Please verify your email before logging in.',
                requiresEmailVerification: true,
            });
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
                isEmailVerified: user.isEmailVerified,
            },
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;