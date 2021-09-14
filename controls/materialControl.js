const Events = require('../models/material/materials.model')
const fs = require('fs')
const path = require('path')

exports.addEvents = async(req, res, next)=>{
  console.log(req.body)
  console.log(req.file)
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
