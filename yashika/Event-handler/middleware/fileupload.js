const multer = require('multer')
const uuid =  require('uuid')

const MIME_TYPE_MAP = {
    'image/png' : 'png',
    'image/jpeg' : 'jpeg',
    'image/jpg' : 'jpg'
};

const fileUpload = multer({
    limits: 50000,
    storage: multer.diskStorage({
        destination: (req, file, cb) =>{
            cb(null, 'uploads/images')
        },
        filename: (req,file,cb) =>{
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid() + '.' + ext);
        },
    }),
    fileFilter : (req, file, cb) =>{
        const isVAlid = MIME_TYPE_MAP[file.mimetype];
        let error = isVAlid? null: new Error("invalid mime type")
        cb(error, isVAlid);
    }
})


module.exports = fileUpload