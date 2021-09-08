const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    qID: {
        type: String,
        required: true
    },
    userId:{
        type: Object,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
})

reportSchema.pre('save', async function(){
    const reporter = await User.findById(this.userId)
    this.userId = await Promise.all(reporter);
    })
module.exports = new mongoose.model('Report', reportSchema);