const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('Report', reportSchema);