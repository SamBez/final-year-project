const jwt = require(jsonwebtoken)
const User = require('../models/user.model')
exports.restrictTo = (...roles)=>{
   
    (req, res)=>{
        if (!roles.includes(req.user.role)){
          return new Error("Unauthorized User for this Action!")
        }
    }

}

exports.ProtectRoute = async (req, res, cb)=>{
    let token = '';
    let decoded;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.header.authorization.split(' ')[1]
        decoded = jwt.verify(token, 'secret')
    }
    if (token){
         await User.findById({id: decoded._id}, (error, result)=>{
             if(error) throw error
             else{
                cb();
             }
         })
        
    }
    else {
        res.json({
            status: " failure",
            message: "YOu are not Logged In"
        })
    }
}
