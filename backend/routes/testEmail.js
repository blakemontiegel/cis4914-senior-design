const express = require('express');
const sendEmail = require('../utils/sendEmail');

const router = express.Router();

//POST /api/test-email
router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    await sendEmail({
      to: email,
      subject: 'Sideline test email',
      html: `
        <p>Hi!</p>
        <p>If you're seeing this in Mailtrap, your mail thingy works 🎉</p>
      `,
    });

    res.json({ message: 'Test email sent (check Mailtrap inbox)' });
  } catch (err) {
    console.error('Test email error:', err);
    res.status(500).json({ message: 'Failed to send test email' });
  }
});

module.exports = router;