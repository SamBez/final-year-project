const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Types.ObjectId,
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

answerSchema.pre('save', async function(){
    const member = await User.findById(this.userId)
    this.userId = member;
    })


module.exports = new mongoose.model('answer', answerSchema);