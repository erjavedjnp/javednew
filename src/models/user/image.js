const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      ],
    filename: {
        required: true,
        type: String,
    }
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;