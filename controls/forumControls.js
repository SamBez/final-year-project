const question = require('../models/forum/question.model');
const Answer = require('../models/forum/answers.model');
const Reason = require('../models/forum/reports.model');
const User = require('../models/user.model')
exports.postQuestion = async (req, res, next)=>{
    const user = await User.findOne({_id: req.params.userId});
    if (user.activated == false){
        res.json({
            status: 'failure', 
            message: 'you have been banned from posting any Questions'
        })
    }else{

    const questionData = {
              title: req.body.title, 
              description: req.body.description,
              userId: req.params.userId,
              catagory: req.body.catagory
    }
    const createdQ = await question.create(questionData, (err, result)=>{
        if (err) {
            console.log("Prob creating question")
            console.log(err);
            res.json({
                status: 'failure',
                message: 'Unable to Post your Question.'
            })
        }

        else{
            res.json({
                status: "success",
                result
            });
        }
    });
}
    next();
}
exports.allQuestionsbyDate = async (req, res, next)=>{
    const allQuestions = await question.find({createdAt: {$gt: new Date(new Date().getTime()-20*24*60*60*60*1000).toISOString()}})
    console.log(allQuestions)
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
    console.log(req.params.userId)
    const questions = await question.find({userId: req.params.userId});
    console.log(questions);
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
            status: 'success',
            updated
           
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
exports.getAllReports = async(req, res, next)=>{
  
    const reason = await Reason.find({qID: req.params.qID}, (err, result)=>{
        if(err) throw err

        else{
            console.log(result);
            res.json({
                status: 'success',
                result
            })
        }
    });

}
exports.giveAnswer = async (req, res, next)=>{
    let data ={
        userId : req.params.userId,
        description: req.body.description,
        qID: req.body.qID
    }
     console.log(data); 
    const reason = await Answer.create(data);
    if(reason){
    res.json({
        status: 'success',
        reason
    })
}
else{
    res.json({
        status: 'failure',
        message: "Your answer ahs not been registered."
    })
}
    /* (err, result)=>{
        if(err) throw err

        else{
           /* res.json({
                status: 'success',
                result
            })
            console.log(result);
        }*/
        console.log(reason);
    //});
    next();
}

exports.getallAnswers = async(req, res, next)=>{
        
    const reason = await Answer.find({qID: req.params.qID});

         if(reason == []){
            console.log("no result found "+reason);
            res.json({
                status: 'failure',
                message: 'No Answers Yet'
            });
        }
        else{
            let user = []
           // for(reas in reason){
             //   console.log(reason[reas])
              //user.push( await User.findById(reason[reas].userId))
           // }
            
            res.json({
                status: 'success',
                reason,
                user       
                });
            }
        console.log(reason);
        next();

}
exports.getQuestion = async(req, res, next)=>{
    const myQuestions = await question.findById(req.params.qID); 
    const user = await User.findById(myQuestions.userId)
         if(!myQuestions ){
            console.log(myQuestions);
            res.json({
                status: 'failure',
                message: 'No Answers Yet'
                
            })
        }
        else{
            console.log(myQuestions)
            res.json({
                status: 'success',
                myQuestions,
                user
                
                })
            }
       next();
}