const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const router = express.Router();
const upload = multer();

async function convertImage(file, format) {
    try {
        const convertedImage = await sharp(file.buffer)
            .toFormat(format.toLowerCase())
            .toBuffer()

            return convertedImage
    } catch(err) {
        console.error(err);
        throw err
    }
}
router.post('/convert-images', upload.array('images'), async (req, res) => {
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
    } catch(err) {
        console.error('Error during image conversion:', err)
        res.status(500).send('Error converting images');     
    }

})

module.exports = router;