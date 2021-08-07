const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
       clubname:{
           type: String,
           required: true
       },
       logo: {
           type: Buffer,
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
           required: true
       }

});

module.exports = new mongoose.model('clubs', clubSchema);