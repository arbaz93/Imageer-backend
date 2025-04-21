const fs = require('fs');
const path = require('path');

function deleteImagesWhoseTimeIsUp() {
    const jsonPath = path.join(__dirname, '../json/imagesOnPendingForDeletion.json')
    const rawData = fs.readFileSync(jsonPath);

    const jsonData = JSON.parse(rawData);
    return jsonData;
}



module.exports = { deleteImagesWhoseTimeIsUp };