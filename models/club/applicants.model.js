const mongoose = require('mongoose')

const applicantSchema = new mongoose.Schema({
    clubId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    department: {
        type: String
    },
    WhyThisClub:{
        type: String
    }
})

module.exports = new mongoose.model('applicant', applicantSchema)