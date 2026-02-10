const express = require('express');
const Video = require('../models/Video');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const video = await Video.create({
            url: req.body.url
        });

        res.json(video);
    } catch (err) {
        console.error('Video error:', err);
        res.status(500).json({message: 'Server error'});
    }
});

router.get('/', async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({message: 'Server error'});
    }
});

module.exports = router;