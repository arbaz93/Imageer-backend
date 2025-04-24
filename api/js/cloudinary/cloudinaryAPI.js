const cloudinary = require('./cloudinary');
const path = require('path');
const { monthIsPassedSinceUpload } = require('../time');
const { writeJsonFile, readJsonFile } = require('../handleJSON');

async function deleteImageFromCloudinary(publicId) {
    try {
        const res = await cloudinary.uploader.destroy(publicId);
        console.log(res);
      
        return { success: true, res, publicId };
    } catch(err) {
        console.error('Something went wrong!!!', err);
        return { success: false, err, publicId};
    } 
}

async function deleteImagesWhoseTimeIsUp() {

    const jsonPath = path.join(__dirname, '../../json/imagesOnPendingForDeletion.json')
    const jsonFile = (await readJsonFile(jsonPath));
    let newJson = [];
    if(!jsonFile.success) return ({ success: false, message: 'cannot read json file.'});
    const json = jsonFile.json;

    json.forEach(async (imageData) => {
        const timeIsPassed = monthIsPassedSinceUpload(imageData.timestamp);
        
        console.log('time', timeIsPassed)
        if(timeIsPassed) {
            const res = await deleteImageFromCloudinary(imageData.public_id);
        } else if(!timeIsPassed) {
            newJson.push(imageData);
        }
    });

    const updatedJson = await writeJsonFile(jsonPath, newJson);

    return updatedJson;
}
async function queueImageForDeletion(imageData) {
    const jsonPath = path.join(__dirname, '../../json/imagesOnPendingForDeletion.json')
    const jsonFile = (await readJsonFile(jsonPath));

    if(!jsonFile.json) return { success: false, message: `failed to add ${imageData.public_id} to queue for deletion!`};
    const json = jsonFile.json;
    const updatedJson = [...json, imageData];

    const res = await writeJsonFile(jsonPath, updatedJson);
    
    if (!res.success) return { success: false, message: `failed to add ${imageData.public_id} to queue for deletion!`};
    
    return { success: true, message: `Add ${imageData.public_id} to queue for deletion!`};
}
module.exports = { deleteImageFromCloudinary, deleteImagesWhoseTimeIsUp, queueImageForDeletion }