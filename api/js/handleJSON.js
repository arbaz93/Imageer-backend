const fs = require('fs').promises;
const db = require('../firebase/firebase');

async function writeJsonFile(imageData) {
    try {
        const safeId = encodeURIComponent(imageData.public_id);
        const d = await db.collection('imagesPendingForDeletion').doc(safeId).set(imageData);

        return { success: true, message: `added ${safeId} to db` };
    } catch (err) {
        console.error(err)
        return { success: false, err }
    }
}

async function readJsonFile() {
    try {
        const res = await db.collection('imagesPendingForDeletion').get();
        const imageData = res.docs.map(doc => doc.data());

        console.log(imageData)
        return { success: true, imageData };
    } catch (err) {
        return { success: false, err }
    }
}
async function deleteFromJsonFile(id) {
    try {
        const safeId = encodeURIComponent(id);
        const res = await db.collection('imagesPendingForDeletion').doc(safeId).delete();

        return { success: true, message: `deleted ${safeId} from db` };
    } catch (err) {
        return { success: false, err }
    }
}
module.exports = { readJsonFile, writeJsonFile, deleteFromJsonFile };