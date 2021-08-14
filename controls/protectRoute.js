const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.restrictTo = (...roles)=>{
   
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)){
          res.json({
           message: new Error("Unauthorized User for this Action!")
          }); 
        }
        next();
    }
}

exports.protectRoute = async (req, res, next)=>{
    let token = '';
    let decoded;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
        decoded = jwt.verify(token, 'secret')
        console.log(token + " and ..............." + decoded.id);
    }
    if (token){
      const freshuser =  await User.findById({_id: decoded.id}, (error, result)=>{
             if(error)  {
             res.json({
                status: " failure",
                message: "YOu are not Logged In"
            })}
             else{
                req.user = result; 
             }
         })
         req.user = freshuser;
         console.log(req.user);
        next();
    }
    else {
        res.json({
            status: "failure",
            message: "YOu are not Logged In"
        })
        next();
    }
}
