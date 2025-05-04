const cloudinary = require('./cloudinary');
const { monthIsPassedSinceUpload } = require('../time');
const { writeJsonFile, readJsonFile, deleteFromJsonFile } = require('../handleJSON');

async function deleteImageFromCloudinary(publicId) {
    try {
        const res = await cloudinary.uploader.destroy(publicId);

        return { success: true, res, publicId };
    } catch (err) {
        console.error('Something went wrong!!!', err);
        return { success: false, err, publicId };
    }
}

async function deleteImagesWhoseTimeIsUp() {

    const jsonFile = (await readJsonFile());

    if (!jsonFile.success) return ({ success: false, message: 'cannot read json from db.', err: jsonFile.err });
    const json = jsonFile.imageData;

    json.forEach(async (imageData) => {
        const timeIsPassed = monthIsPassedSinceUpload(imageData.timestamp);

        if (timeIsPassed) {
            try {
                await deleteImageFromCloudinary(imageData.public_id);
                await deleteFromJsonFile(imageData.public_id);
                return { success: true, message: `deleted ${imageData.publicId} | timeup` }

            } catch (err) {
                return { success: false, message: `Error deleting ${imageData.publicId} | timeup`, err }
            }
        }
    });
}
async function queueImageForDeletion(imageData) {
    try {
        await writeJsonFile(imageData);
        await deleteFromJsonFile('imageer_upload/Screenshot_2025-03-02_15-27-11_xflne9');
        await readJsonFile();
        return { success: true, message: `Added ${imageData.public_id} to queue for deletion!` };
    } catch (err) {
        return { success: false, message: `failed to add ${imageData.public_id} to queue for deletion!` };
    }
}
module.exports = { deleteImageFromCloudinary, deleteImagesWhoseTimeIsUp, queueImageForDeletion }