// api/deleteImage.js
const express = require('express');
const router = express.Router();
const { queueImageForDeletion } = require('../js/cloudinary/cloudinaryAPI');

// Handle image deletion request (POST /api/delete-image-time-month)
router.post('/delete-image-time-month', async (req, res) => {
    console.log(req.body)
    const imageData = {
        public_id: req.body.id,
        timestamp: req.body.timestamp
    };

    if (!imageData.public_id) {
        return res.status(400).json({ error: 'Missing public_id' });
    }

    try {
        const queueStat = await queueImageForDeletion(imageData);
        if (!queueStat.success) {
            return res.status(500).json({ error: queueStat.message });
        }
        res.status(200).json({ success: true, message: queueStat.message });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = router;
