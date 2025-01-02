const multer = require('multer');
const path = require('path');
 
 const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Rename file
    },
  });

  
  const upload = multer({ storage: storage });

  module.exports=upload