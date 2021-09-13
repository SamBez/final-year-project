const mongoose = require('mongoose')
const Report = require('./reports.model')
const Answer = require('./answers.model')
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
    no_answers: {
        type: Number,
        required: true,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }, 
    reports: [],
    answers: []
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

questionSchema.pre('save', async function(){
    const report = this.reports.map(async id => await Report.findById(id))
    this.reports = await Promise.all(report);
});
questionSchema.pre('save', async function(){
    const answer = this.answers.map(async id => await Answer.findById(id))
    this.answers = await Promise.all(answer);
});


module.exports = new mongoose.model('Question', questionSchema);