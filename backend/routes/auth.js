const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

function validatePassword(password) {
    if(!password || password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number.';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return 'Password must contain at least one special character.';
    }
    //if valid
    return null;
}

//POST /api/auth/register

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
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

        const verificationToken = crypto.randomBytes(32).toString('hex');
        const verificationExpires = Date.now() + 1000 * 60 * 60 * 24;

        const user = await User.create({
            username, 
            email, 
            passwordHash,
            isVerified: false,
            emailVerificationToken: verificationToken,
            emailVertificaitonExpires: verificationExpires,
        });

        const clientUrl = process.env.CLIENT_URL || 'https://localhost:3000';
        const verifyUrl = `${clientUrl}/verify-email?token=${verificationToken}`;

        await sendEmail({
            to: user.email,
            subject: 'Verify your Sideline account',
            html: `
            <p>Hi ${user.username},</p>
            <p>Thanks for signing up for Sideline! Please verify your email by clicking the link below:</p>
            <p><a href="${verifyUrl}">Verify my email</a></p>
            <p>If you did not create this account, you can ignore this email.</p>
            `,
        });

        res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.',
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

        if(!token) {
            return res.status(400).json({ message: 'Missing verification token' });
        }

        const user = await User.findOne({
            emailVerificationToken: token,
            emailVertificaitonExpires: { $gt: Date.now() },
        });

        if(!user) {
            return res.status(400).json({ message: 'Invalid or expired verification token' });
        }

        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();

        res.json({message: 'Email successfully verified. You can now log in.' });
    } catch (err) {
        console.error('Verify email error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//POST /api/auth/login
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

        if(!user.isVerified) {
            return res
                .status(403)
                .json({ message: 'Please verify your email before loggin in.' });
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

//POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        
        const user = await User.findOne({ email });

        //send msg regardless to avoid leaking a valid email
        if(!user) {
            return res.json({
                message: 'If an account with that email exists, a reset link has been sent.',
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetExpires = Date.now() + 1000 * 60 * 60;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetExpires;
        await user.save();

        const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';
        const resetUrl = `${clientUrl}/reset-password?token=${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: 'Reset your Sideline password',
             html: `
                <p>Hi ${user.username},</p>
                <p>You requested a password reset. Click the link below to set a new password:</p>
                <p><a href="${resetUrl}">Reset my password</a></p>
                <p>If you did not request this, you can ignore this email.</p>
            `,
        });

        res.json({
            message: 'If an account with that email exists, a reset link has been sent.',
        });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

//POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const { token, password } = req.body;

        if(!token || !password) {
            return res
                .status(400)
                .json({ message: 'Missing token or new password' });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if(!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            return res.status(400).json({ message: passwordError });
        }

        const passwordHash = await bcrypt.hash(password, 10);

        user.passwordHash = passwordHash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ message: 'Password has been reset successfully.' });
    } catch (err) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;