const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AudiolinkSchema = new Schema({
    name: {
        type: String
    },
    audio: [{
        name: {
            type: String
        },
        url: {
            type: String
        }
    }]
});

var AudioLink = mongoose.model("Audio", AudiolinkSchema);
module.exports = AudioLink;
