const User = require("../models/user.model.js");
const path = require("path");
const jwt = require("jsonwebtoken");
const ServError = require("../utils/ServerError");
const nodemailer = require("nodemailer");
const sendmail = require("../email");
const crypto = require("crypto");

exports.login = async (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  console.log(username);
  try {
    const user = await User.findOne({
      email: email,
    });
    if (user && user.role == "student") {
      if (user.password == password) {
        if (user.activated == false) {
          res.status(202).json({
            status: "deactivated",
            message:
              " This account has been suspended due to some inappropriate activities, contact The Administrator! ",
          });
        } else {
          const token = jwt.sign(
            {
              id: user._id,
              email: user.email,
            },
            "secret",
            {
              expiresIn: "10d",
            }
          );
          res.status(200).json({
            status: "success",
            data: user,
            token,
          });
        }
      } else {
        console.log(new ServError("Wrong Password", 202));
      }
    } else if (user && user.role != "student") {
      res.json({
        message: "You need to change password !",
      });
      next();
    } else {
      res.json({
        message: new ServError("No Such Account", 400),
      });
    }
  } catch (error) {
    console.error(error);
  }
};

exports.signup = async (req, res, cb) => {
  console.log(req.body);
  const foundUser = await User.findOne({
    email: req.body.email,
  }).select("email");
  console.log(foundUser);
  if (foundUser === null) {
    try {
      const newUser = await User.create(req.body);
     const token = jwt.sign(
        {
          id: newUser._id,
          studId: newUser.studId,
        },
        "secret",
        {
          expiresIn: "1h",
        }
      );
      res.status(201).json({
        status: "success",
        data: {
          user: newUser,
          token
        }
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    res.json(
      new ServError("User Already Exists with the specified Email", 200)
    );
  }
  cb();
};
exports.customSignup = async (req, res, cb) => {
  const newAdmin = await User.findOne({
    email: req.body.email,
  });
  const dummyPsw = crypto.randomBytes(8).toString('hex')
  if (newAdmin) {
    res.status(201).json({
      status: "failure",
      message: " This Email has Already been Used",
    });
  } else {
    const createdAdmin = await User.create(req.body, (error, result) => {
      if (error) {
        res.json({
          status: "failure",
          message: "Unable to create account",
        });
      } else {
        //EmailShit
        try {
          sendmail.sendEmail(
            {
              to: `${req.body.email}`,
              subject: "Hello",
              text: `Dear ${req.body.firstname}, Here is your password.
                     Password: ${dummyPsw} 
                     please make sure to change it asap!`,
            },
            (err, result) => {
              if (err) throw err;
              else {
                res.json({
                  status: "success",
                  message: " Email sent successfully!",
                });
              }
            }
          );

          // console.log("Message sent:%s", info.messageId);
          //console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } catch (error) {
          console.error(" Eroror");
        }
      }
    });
  }
};
exports.forgotPassword = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  console.log(user);
  if (!user) {
    res.json({
      status: "fail",
      message: " No user found",
    });
  } else {
    let resetToken;
    try {
      resetToken = user.createPasswordResetToken();
      console.log("from forgotps func "+ resetToken);
      console.log("the user obj " + user);
      await user.save();
      console.log(req.body.email);
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/users/resetPassword:token=${resetToken}`;
      sendmail.sendEmail({
        from: "Admins Office <jonas@gmail.com>",
        to: `${req.body.email}`,
        subject: `Adminstrative Offce`,
        message: `Seems Like you forgot your password. Reset YOur password with this link. 
        ${resetUrl} know that it will expire after 10mins 
        If this is not you then ignore this email `,
      });
      res.status(200).json({
        status: "success",
        message: "Message is sent to your email! ",
        user
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      console.error(error);
    }
  }
};

exports.changeOfPassword = async (req, res, next) => {
  const hashedPsw = crypto
                    .createHash('sha256') 
                    .update(req.params.token)
                    .digest('hex');
  console.log(req.params.token + " " + hashedPsw);
  const user = await User.findOne({passwordResetToken : hashedPsw, passwordResetExpires: {$gt: Date.now()} });
console.log(user);
  if(!user){
    res.json({
      message: 'Your Token does not much. Try again!'
    });
  }
  else{
    user.password = req.body.password;
    await user.save();
    res.json({
      status: "success",
      message: ' Password Changed successfully!',
      user:{
        user
      }
    })
  }

};
