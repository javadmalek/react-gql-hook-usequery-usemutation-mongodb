const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    id:   String,
    name: String,
    field_of_study: String,
    enrolment_year: Number,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
});


module.exports = mongoose.model('Student', StudentSchema);