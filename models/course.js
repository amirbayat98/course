const mongoose = require('mongoose');
const CourseSchema = new mongoose.Schema({
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'video'
        }
    ],
    name: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = course = mongoose.model('course', CourseSchema);