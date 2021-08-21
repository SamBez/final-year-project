const mongoose = require('mongoose')

const infoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required: true
    },
    posted_date:{
        type: Date,
        required: true,
        default: Date.now()
    },
    file: {
        type: Buffer,
        contentType: String,
        required: true
    },
    userId:{
        type: String, 
        required: true
    }
})

module.exports = new mongoose.model('Information', infoSchema);