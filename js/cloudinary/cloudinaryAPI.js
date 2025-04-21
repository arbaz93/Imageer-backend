const cloudinary = require('./cloudinary');

async function deleteImageFromCloudinary(publicId) {
    try {
        const res = await cloudinary.uploader.destroy(publicId);
        return { success: true, res, publicId };
    } catch(err) {
        console.error('Something went wrong!!!', err);
        return { success: false, err, publicId};
    }
}

module.exports = { deleteImageFromCloudinary }