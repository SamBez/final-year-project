const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    course_title: {
        type: String,
        required: true
    },
    course_description:{
        type: String,
        required: false
    },
    posted_date:{
        type: Date,
        defualt: Date.now()
    },
    department: {
        type: String,
        required: false
    }, 
    year: {
        type: String,
        required: false
    }, 
    file:{
        type: String
    }
})

module.exports = new mongoose.model('materials', materialSchema);