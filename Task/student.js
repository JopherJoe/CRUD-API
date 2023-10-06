const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true,
    },
    last_name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
    },
    course:{
        type: String,
        required: true,
    },
    section:{
        type: String,
        required: true,
    }
})

const Task = mongoose.model('Task', studentSchema);
module.exports = Task;