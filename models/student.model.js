const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studID:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: false
    },
    clubmember:{
        type: Boolean,
        required: true,
    },
    clubId:{
        type: String,
        required: false
    }, 
    department: {
        type: String,
        required: true
    }
      
})

module.exports = new mongoose.model('student', studentSchema);