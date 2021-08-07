const mongoose = require('mongoose')

const materialSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: Buffer,
        required: true
    },
    posted_date:{
        type: String,
        required: true
    },
    department: {
        type: String,
        required: false
    },
    course:{
        type: String,
        required: false
    }
})

module.exports = new mongoose.model('Information', materialSchema);