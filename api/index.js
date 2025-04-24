const express = require('express');
const cors = require('cors');
const path = require('path');
const { queueImageForDeletion } = require('./js/cloudinary/cloudinaryAPI');

const app = express();

// CORS and middleware
app.use(cors());
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));

// Root route (GET /)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Handle image deletion request (POST /api/delete-image-time-month)
app.post('/delete-image-time-month', (req, res) => {
    console.log(req.body);
    const imageData = {
        public_id: req.body.id,
        timestamp: req.body.timestamp
    };
    if (!imageData.public_id) {
        return res.status(400).json({ error: 'Missing public_id' });
    }
    queueImageForDeletion(imageData);
    res.status(200).json({ message: 'Request submitted!' });
});

// 👇 Exporting app so that vercel can handle serverless
module.exports = app;
