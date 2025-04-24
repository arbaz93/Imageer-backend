// This is a cron job set to run every hour
// there is an image whose upload time exeeds 30days.
// 30days = timestamp: 2592000000;

const { deleteImagesWhoseTimeIsUp } = require('./api/js/cloudinary/cloudinaryAPI');

(async () => {
    console.log('running image cleanup!!!')
    const del = await deleteImagesWhoseTimeIsUp();

    console.log(del)
})();
