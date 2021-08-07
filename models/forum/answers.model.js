const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rates: {
        type: Number,
        required: true
    },
    no_report: {
        type: Number,
        required: true
    }
})

module.exports = new mongoose.model('answer', answerSchema);