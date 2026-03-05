const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const videoRoutes = require("./routes/videos");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err => console.error('MongoDB connection error:', err)));

app.get('/', (req, res) => {
    res.json({message: 'API is running'});
});

app.use('/videos', videoRoutes);

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));