// Set up storage engine using multer
import multer from "multer";
import path from 'path';
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable with multer settings
export const upload = multer({
    storage: storage,
    limits: { fileSize: 50000000 * 100 }, // 50MB file size limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

function checkFileType(file, cb) {
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif|bmp|tiff|svg|webp|ico/;

    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = filetypes.test(file.mimetype);

    // console.log("checking ==========", mimetype, "=======", extname)
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Invalid file type!');
    }
}
// Route to handle file upload along with other data
