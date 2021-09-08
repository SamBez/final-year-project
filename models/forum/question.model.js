const mongoose = require('mongoose')
//const User = require('../')
const questionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
   catagory:{
        type: String,
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
    }, 
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
})
questionSchema.pre('save', ()=>{
   // this.userId = await User.findbyId(this.userId)
})
 //questionSchema.pre('save', (next)=>{
   //  this.createdAt =  Date.now()
     //next();
 //});

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