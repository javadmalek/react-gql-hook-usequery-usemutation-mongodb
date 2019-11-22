const mongoose = require('mongoose');

const CourseSchema = mongoose.Schema({
    id:  String,
    name: String,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', CourseSchema);