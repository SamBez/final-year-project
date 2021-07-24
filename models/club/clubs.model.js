const mongoose = require('mongoose');

const clubs = new mongoose.Schema({
       clubname:{
           type: String,
           required: true
       }
})