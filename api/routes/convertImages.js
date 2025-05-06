require('dotenv').config();
const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const router = express.Router();
const CLIENT_URL = process.env.CLIENT_URL;

const uploadConfig = {
    limits: {
        fileSize: 50 * 1024 * 1024 // 50 MB per file, adjust as needed
    }
}
const upload = multer(uploadConfig);

async function convertImage(file, format) {
    try {
        const convertedImage = await sharp(file.buffer)
            .toFormat(format.toLowerCase())
            .toBuffer()

        return convertedImage
    } catch (err) {
        console.error(err);
        throw err
    }
}
router.post('/convert-images', upload.array('images'), async (req, res) => {

    // CORS headers for Vercel
    res.setHeader('Access-Control-Allow-Origin', CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');


    const formats = req.body['convertTo[]'] || req.body.convertTo;
    const filenames = req.files.map((file, i) => {
        const filePath = file.originalname;
        const fileNameWithoutExtension = filePath.replace(/\.[^/.]+$/, '');

        return `${fileNameWithoutExtension}.${formats[i]}`;
    });

    try {
        const convertedBuffer = await Promise.all(req.files.map((file, i) => convertImage(file, formats[i])))
        console.log(req.data)
        const base64Buffers = convertedBuffer.map(buf => buf.toString('base64'));
        res.send({ base64Buffers, filenames, formats });
    } catch (err) {
        console.error('Error during image conversion:', err)
        res.status(500).send('Error converting images');
    }

})

module.exports = router;