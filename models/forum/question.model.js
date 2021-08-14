const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    rate: {
        type: Number,
        required: false,
        default: 0 
    },
    no_report: {
        type: Number,
        required: true,
        default: 0
    }
})

//questionSchema.pre('save', (next)=>{
  //  if(this.no_report >= 5){
    //var userObj =  this.model('users');
   // newuserObj = new userObj({
      //  'activated': false
    //}); 
//}

   // next();
//})
module.exports = new mongoose.model('Question', questionSchema);