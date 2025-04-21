const express = require('express');
const cors = require('cors');
const cloudinaryAPI = require('./js/cloudinary/cloudinaryAPI');
const { deleteImagesWhoseTimeIsUp } = require('./js/handleJSON');
const time = require('./js/time');
const app = express();
const port = 8000;
const deleteImageFromCloudinary = cloudinaryAPI.deleteImageFromCloudinary;

app.use(cors());
app.use(express.json());

app.post('/delete-image-time-month', (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({ error: "Missing public_id" });
    }
    res.status(200).json({message: 'request submitted!!!'})

    console.log(deleteImagesWhoseTimeIsUp())
    setTimeout(async () => {
        const res = await deleteImageFromCloudinary(req.body.id);
        console.log(res)
    }, 10000)
})


app.listen(port, () => {
    console.log(`server is running at https://localhost:${port}`)
})