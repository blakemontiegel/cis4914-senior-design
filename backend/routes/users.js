const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

// Get /api/users/me
router.get('/me', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if(!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (err) {
        console.error('Get me error:', err);
        res.status(500).json({ message: 'Server error'});
    }
});

module.exports = router;