const cloudinary = require('cloudinary')
//const dotenv = require('dotenv')

//dotenv.config()

cloudinary.config({
    cloud_name : "dll0oquzm",
    api_key : "886949424124784",
    api_secret : "FvFfHXU85gSpfIwFcQ9LgC2ktPM"
})

exports.uploads = (file,folder) =>{
    return new Promise(resolve =>{
        cloudinary.uploader.upload_large(file, (result) =>{
            resolve ({
                url: result.url,
                id: result.public_id
            })
        }, {
            resurce_type : "auto",
            folder: folder
        })
    })
}