const fs = require('fs').promises;

async function writeJsonFile(file, json) {
    try {
        await fs.writeFile(file, JSON.stringify(json, null, 4));
        return { success: true };
    } catch (err) {
        console.log(err)
        return { success: false, err }
    }
}

async function readJsonFile(file) {
    try {
        const rawData = await fs.readFile(file, 'utf-8');
        const json = JSON.parse(rawData);

        return { success: true, json };
    } catch (err) {
        return { success: false, err }
    }
}

module.exports = { readJsonFile, writeJsonFile };