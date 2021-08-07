const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    studId: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('applicant', applicantSchema)