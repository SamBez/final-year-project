const Events = require('../models/information/info.model')

exports.addEvents = async(req, res, next)=>{
     const Event = {
         title: req.body.title,
         body: req.body.body,
         userId: req.body.userId
     }
   await Events.create(Event, (err, result)=>{
      if(err){
          res.json({
              status: 'failure',
              message: " File Couldnot be posted"
          });
          next();
        }
          else{
            next();
          }
   })
}

exports.getAllEvents = async( req, res, next)=>{
    const Event = await Events.find({})
}