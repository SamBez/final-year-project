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
        token = req.header.authorization.split(' ')[1]
        decoded = jwt.verify(token, 'secret')
    }
    if (token){
         await User.findById({id: decoded._id}, (error, result)=>{
             if(error) throw error
            /* res.json({
                status: " failure",
                message: "YOu are not Logged In"
            })*/
             else{
                req.user = result; 
             }
         })
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
