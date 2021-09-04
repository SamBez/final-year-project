const question = require('../models/forum/question.model');
const answer = require('../models/forum/answers.model');
const Reason = require('../models/forum/reports.model');

exports.postQuestion = async (req, res, next)=>{
    const questionData = {
              title: req.body.title, 
              description: req.body.description,
              userId: req.body.userId,
              catagory: req.body.catagory
    }
    const createdQ = await question.create(questionData, (err, result)=>{
        if (err) {
            console.log("Prob creating question")
            console.log(err);
        }

        else{

            res.json({
                status: "success",
                data:{
                    result
                }
            });
        }
    });
    next();
}
exports.allQuestionsbyDate = async (req, res, next)=>{
    const allQuestions = await question.find({createdAt: {$gt: new Date(new Date().getTime()-20*24*60*60*60*1000).toISOString()}})
    
    if( allQuestions){
        res.json({
        status:'success',
        allQuestions
    })}
    else{
        res.json({
            status: 'failure',
            message: 'no recent Question.'
        })
    }
    next();
}
exports.myQuestions = async (req, res, next) =>{
    const questions = await question.find({userId: req.params.userId});
    if( !questions){
        res.json({
            status: 'failure',
            message: 'You dont have any question posted yet!'
        })
    }
    else{
        res.json({
            status: 'success',
            questions
        })
    }
    next();
}
exports.removeQuestion = async (req, res, next)=>{
       const questionID = req.params.id;
       await question.findOneAndRemove({_id: questionID}, (err, result)=>{
           if(err) throw err
           else{
               res.status(201).json({
                   status:'success',
                   message: " Question Deleted!"
               });
           }
       })
       next();
}
exports.editQuestion = async (req, res, next)=>{
    const questionID = req.params.id;
    const questions = await question.findOne({_id: questionID}, (err, result)=>{
        if(err) throw err
        else{
            console.log(result);
        }
    });
    if (questions){
       questions.title = req.body.title;
       questions.description = req.body.description
       const updated = await questions.save();
       res.json({
           data: {
               updated
           }
       })
    }
}
exports.rateQuestion = async (req, res, next)=>{
     try{
         const questionn = await question.findOne({_id: req.params.id}).select('title');
         questionn.rate +=1;
         questionn.save();
         res.json({
            status: "success",
            message: " Succefully voted!"
        })
         next();
     } catch(err){
     res.json({
        status: "failure",
        message: "Not voted!"
    })   
     }
}
exports.makeReport = async(req, res, next)=>{
  
    const data ={
         userId : req.params.userId,
         questionID : req.params.qID,
         reason: req.body.reason
    }
    const reason = Reason.create(data, (err, result)=>{
        if(err) throw err
        else{
            console.log(result);
        }
    });

    if(reason){
        res.json({
            message:" Question successfuly reported!"
        })
    }

}