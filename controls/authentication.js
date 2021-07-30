const User = require("../models/user.model.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const ServError = require("../utils/ServerError");
const { type } = require("os");

exports.login = async (req, res, cb) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username)
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      if (user.password == password) {
        const token = jwt.sign(
          { id: user._id, email: user.email },
          "secret",
          { expiresIn: "10s" }
        );
        res.status(200).json({
          status: "success",
          data: user,
          token,
        });
      } else {
        console.log(new ServError("Wrong Password", 202));
      }
    } else {
      console.log(new ServError("No Such Account", 400));
    }
  } catch (error) {
    console.error(error);
  }
};

exports.signup = async (req, res, cb) => {
  
  console.log(req.body);
  const foundUser = await User.findOne({ email: req.body.email }).select('email');
  console.log(foundUser);
  if (foundUser === null) {
     try {
      const newUser = await User.create(req.body);
      jwt.sign({id: newUser._id, studId: newUser.studId}, 
         "secret",
         {expiresIn: '1h'});
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
        },
        token
      });
    }
     catch (error) {
        console.error(error);
     }
  }
  else{
     res.json((new ServError("User Already Exists with the specified Email", 200)))
  }
  cb();
};
exports.customSignup = async (req, res, cb)=>{
   const newAdmin = await User.findOne({ email: req.body.email});
   if (newAdmin){
      res.status(201).json({
         status: 'failure',
         message: " Email Already Used"
      })
   }
   else{
      const createdAdmin = User.create(req.body , (error, result)=>{
         if(error){
            res.json({
               body: {
                  createdAdmin
               }
            })
         }
         else{
            //EmailShit
         }
      });
   }
}