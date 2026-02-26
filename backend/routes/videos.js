const express = require('express');
const multer = require('multer');
const { PutObjectCommand } = require('@aws-sdk/client-s3');

const Video = require('../models/Video');
const s3 = require('../config/s3');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

const upload = multer({
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
});

router.post(
  '/',
  auth,
  upload.single('files'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const file = req.file;

      const s3Key = `videos/${Date.now()}-${file.originalname}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: s3Key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${s3Key}`;

      const video = await Video.create({
        title: file.originalname,
        url,
        s3Key,
        uploadedBy: req.user.id,
      });

      res.status(201).json(video);

    } catch (err) {
      console.error('Video upload error:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

router.get('/', auth, async (req, res) => {
  try {
    const videos = await Video.find({ uploadedBy: req.user.id })
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (err) {
    console.error('Fetch videos error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;