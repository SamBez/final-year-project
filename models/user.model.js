const mongoose = require('mongoose');

 const userSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    studId:{
        required: false,
        type: String
    },
    phone: {
        required: false,
        type: String
    },
    username:{
        required: true,
        type: String,
    },
    department:{
        required: true,
        type: String
    },
    year: {
        required: false,
        type: Number,
    },
    password: {
        required: true,
        type: String,
    },
    activated: {
        required: true,
        default: true,
        type: Boolean
    }, 
    role: {
        type: String,
        enum: ['super-admin', 'student', 'forum-admin', 'material-admin', 'info-director', 'club-president'],
        default: 'student'
    }
});

 module.exports = new mongoose.model('users', userSchema);