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
        type: String,
        required: true
    },
    file: {
        type: Buffer,
        required: false
    }
})

module.exports = new mongoose.model('Information', infoSchema);