const Events = require('../models/information/info.model')
const fs = require('fs')
exports.addEvents = async(req, res, next)=>{
     const Event = {
         title: req.body.title,
         body: req.body.body,
         userId: req.params.userId,
         file: {
           data: fs.readFileSync(path.join(__dirname +'/'+ req.file.path)),
           contentType: 'image/jpg/png'
         }
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
              message:{
                result
              }
            })
            next();
          }
   })
}

exports.getAllEvents = async( req, res, next)=>{
  var date = new Date(Date.now() + 5*24*60*60*1000);
    const Event = await Events.find({ });
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