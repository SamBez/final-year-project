const mongoose = require('mongoose');
const User = require('../user.model')
const clubSchema = new mongoose.Schema({
       clubname:{
           type: String,
           required: true
       },
       logo: {
           data: Buffer,
           contentType: String,
           required: false
       },
       club_description: {
           type: String,
           required: true
       }, 
       maxIntake: {
           type: Number,
           required: false,
       },
       recruiting: {
           type: Boolean,
           required: true,
           defualt: false
       },
       numberOfmembers: {
           type: Number,
           required: false
       },
       members: [],
       userId: {
           type: String,
           required: true
       }

});

clubSchema.pre('save', async function(){
const member = this.members.map(async id => await User.findById(id))
this.members = await Promise.all(member);
})

module.exports = new mongoose.model('clubs', clubSchema);