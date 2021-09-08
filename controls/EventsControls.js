const Events = require('../models/information/info.model')
const fs = require('fs')
const path = require('path')
exports.addEvents = async(req, res, next)=>{
  console.log(req.file.filename)
     const Event = {
         title: req.body.title,
         body: req.body.body,
         userId: req.params.userId,
         file: req.file.filename
         //  data: fs.readFileSync ( req.file.path),
           //contentType: 'image/jpg/png'
         
     }
   //  console.log(Event);
   await Events.create(Event, (err, result)=>{
      if(err){
          res.json({
              status: 'failure',
              message: " File Couldnot be posted"
          });
          console.log(err);
          next();
        }
          else{
            res.json({
              status: " success",
              data: result
            })
            console.log(result);
            next();
          }
   })
}

exports.getAllEvents = async( req, res, next)=>{
  var date = new Date(Date.now() + 5*24*60*60*1000);
    const Event = await Events.find({});
    if (Event){
      res.status(201).json({
        status: " success",
        body:{
          Event
        }
      })
    }
    else{
      res.json({
        status:'failure',
        message:" No Event Added Yet."
      })
    }
}

exports.getEvents = async( req, res, next)=>{
  var date = new Date(Date.now() + 5*24*60*60*1000);
    const Event = await Events.find({userId: req.params.userId});
    if (Event){
      res.status(201).json({
        status: " success",
        body:{
          Event
        }
      })
    }
    else{
      res.json({
        status:'failure',
        message:" No Event Added Yet."
      })
    }
}
exports.deleteEvent = async(req, res, next)=>{
   
  await Events.findOneAndRemove({_id: req.params.id}, (error, result)=>{
    if(error){
      res.json({
        status: 'failure',
        message: " File was not Removed!"
      })
    }
    else{
      res.json({
        status:"success",
        message: 'File Successfuly Removed.',
        result
      })
    }
    next();
  });

}