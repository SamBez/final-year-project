const mongoose = require('mongoose');
const crypto = require('crypto');
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
    phone: {
        required: false,
        type: String
    },
    username:{
        required: true,
        type: String,
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
    passwordResetToken : String,
    passwordResetExpires: Date,
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['super-admin', 'student', 'forum-admin', 'material-admin', 'info-director', 'club-president'],
        default: 'student'
    }
});



userSchema.methods.createPasswordResetToken = ()=>{
    try {
        const resetToken = crypto.randomBytes(32).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires =  Date.now() + 10*60*1000;
         console.log({resetToken}, this.passwordResetToken);
        return resetToken;
    } catch (error) {
     console.error("Some thing wrong in the Schema Methods " +error);   
    }

}
 module.exports = new mongoose.model('users', userSchema);