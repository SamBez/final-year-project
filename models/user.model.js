const mongoose = require('mongoose');

 const user = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: true
    },
    roles: {
        type: Enumerator,
        
    }
});

 const User = new mongoose.model('users', user);

 module.export(User);