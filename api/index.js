const express = require('express');
const cors = require('cors');
const path = require('path');
const deleteImagesRoute = require('./routes/deleteImages');
const convertImagesRoute = require('./routes/convertImages');
const app = express();

// CORS and middleware
app.use(cors({ origin: '*' }));
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));
// Root route (GET /)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// app routes
app.use('/api', deleteImagesRoute);
app.use('/api', convertImagesRoute);


// 👇 Exporting app so that vercel can handle serverless
module.exports = app;