const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true,
    },
    subject:{
        type: [String]
    },
    department:{
        type: String,
        required: true
    }
})

const TeacherTask = mongoose.model('Teacher', studentSchema);
module.exports = TeacherTask;