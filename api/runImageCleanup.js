// This is a cron job set to run every hour
// there is an image whose upload time exeeds 30days.
// 30days = timestamp: 2592000000;

const { deleteImagesWhoseTimeIsUp } = require('./js/cloudinary/cloudinaryAPI');

export default async function handler(req, res) {
    try {
      console.log('Running image cleanup!!!');
  
      const del = await deleteImagesWhoseTimeIsUp();
  
      console.log('Cleanup result:', del);
  
      res.status(200).json({ message: 'Cleanup successful', details: del });
    } catch (error) {
      console.error('Cleanup error:', error);
      res.status(500).json({ error: 'Cleanup failed' });
    }
  }