var express = require('express')
const authenticate = require('./controls/authentication');
const forumjs = require('./controls/forumControls');
const protect = require('./controls/protectRoute');
const router = express.Router();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');


var urlencoder = bodyparser.urlencoded({
   extended:true
 })
var jsonparsor = bodyparser.json();
 mongoose.connect('mongodb://localhost:27017/asaas',{useUnifiedTopology:true}, (error)=>{
   if (error){
       console.log("DB not connected!")
   }
   else{
       console.log(" Successfuly connected")
   }
});

router.post('/login',jsonparsor,  authenticate.login);
router.post('/forgotPassword', jsonparsor, authenticate.forgotPassword);
router.post('/signup', jsonparsor, authenticate.signup);
router.post('/adminSignup', jsonparsor, authenticate.customSignup);
router.post('/users/resetPassword/:token', jsonparsor, authenticate.changeOfPassword);
      // Forum routes
router.post('/postQuestion',jsonparsor,protect.protectRoute, protect.restrictTo('student'),  forumjs.postQuestion);
/*router.put('/editQuestion', jsonparsor, protect.restrictTo('student'), protect.protectRoute, forumjs.editQuestion);
router.post('/rateQuestion', jsonparsor, protect.restrictTo('student'),protect.protectRoute, forumjs.rateQuestion);
router.delete('/removeQuestion', jsonparsor, protect.restrictTo('student'),protect.protectRoute, forumjs.removeQuestion);
router.post('/reportQuestion', jsonparsor, protect.restrictTo('student'), forumjs.makeReport);
*/
module.exports = router;