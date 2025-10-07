// middleware/upload.middleware.js
//
// Multer setup for single resume upload. Limits file types and size.

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('../config/config');


// Ensure upload dir exists.
const uploadDir = path.resolve(process.cwd(), config.UPLOAD_DIR);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {

    // Sanitize filename a bit and prefix with user id + timestamp.
    const safeName = file.originalname.replace(/[^a-z0-9.\-\_]/gi, '_');

    const prefix = (req.user && req.user.id) ? req.user.id : 'anon';

    cb(null, `${prefix}-${Date.now()}-${safeName}`);
  }
});


const fileFilter = function (req, file, cb) {

  // Accept only PDFs and DOCX/DOC for now.
  const allowed = ['.pdf', '.docx', '.doc'];

  const ext = path.extname(file.originalname).toLowerCase();

  if (allowed.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF/DOC/DOCX allowed.'));
  }
};


const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2 MB
  fileFilter
});


module.exports = { upload };
