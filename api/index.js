require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const deleteImagesRoute = require('./routes/deleteImages');
const convertImagesRoute = require('./routes/convertImages');
const app = express();
const CLIENT_URL = process.env.CLIENT_URL;

const corsConfig = {
    origin: CLIENT_URL, // or use '*' during dev
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  };
// CORS and middleware
app.use(cors(corsConfig));
app.use(express.json());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

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