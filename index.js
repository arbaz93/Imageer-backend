const express = require('express');
const cors = require('cors');
const { deleteImagesWhoseTimeIsUp, queueImageForDeletion } = require('./js/cloudinary/cloudinaryAPI');
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.post('/delete-image-time-month', (req, res) => {
    console.log(req.body)
    const imageData = {
        public_id: req.body.id,
        timestamp: req.body.timestamp
    }
    if (!imageData.public_id) {
        return res.status(400).json({ error: "Missing public_id" });
    }
    res.status(200).json({message: 'request submitted!!!'})
    queueImageForDeletion(imageData);
    
})



// This functions runs every hour to check if 
// there is an image whose upload time exeeds 30days.
// 30days = timestamp: 2592000000;

setInterval(() => {
    deleteImagesWhoseTimeIsUp();
}, 10000)
app.listen(port, () => {
    console.log(`server is running at https://localhost:${port}`)
})