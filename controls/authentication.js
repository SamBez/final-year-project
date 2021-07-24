const User = require('../models/user.model.js');
const jwt = require('jwt');

exports.login = async (req, res, cb)=>{
   const credentials = {username:req.username, email: req.email, password: req.password}
   const user = User.find(credentials, (res)=>{
          console.log(res);
   })

}