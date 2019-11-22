const mongoose = require('mongoose');

const MarkSchema = mongoose.Schema({
    id: String,
    student_id: String,
    course_id:  String,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Mark', MarkSchema);