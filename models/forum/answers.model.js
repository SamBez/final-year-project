const mongoose = require('mongoose')
const Report = require('./reports.model')
const User = require('../user.model')
const answerSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true
    },
    aID:{
        type: String,
        required: false
    },
    userId:{
        type: [],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rates: {
        type: Number,
        default: 0,
        required: true
    },
    no_report: {
        type: Number,
        default: 0,
        required: true
    },
    reports:[]
})

answerSchema.pre('save', async function(){
    const report = this.reports.map(async id => await Report.findById(id) )
    this.reports = await Promise.all(report);
    }
)

answerSchema.pre('save', async function(){
     const user = await User.findById(this.userId) 
     this.userId = Promise.all(user)
    
    }
)


module.exports = new mongoose.model('answer', answerSchema);