var express = require('express')
const authenticate = require('./controls/authentication');
const forumjs = require('./controls/forumControls');
const protect = require('./controls/protectRoute');
const router = express.Router();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const events = require('./controls/EventsControls')
const club = require('./controls/clubControl')


const Storage = multer.diskStorage({
  destination: 'C:/Users/samra/Desktop/4th year/front/front/src/assets',
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + "_" + Date.now()+ path.extname(file.originalname))
  }
})

var upload = multer({
  storage: Storage
}).single('file');

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
router.post('/super', jsonparsor, (req, res, next)=>{})
router.post('/login',jsonparsor,  authenticate.login);
router.post('/forgotPassword', jsonparsor, authenticate.forgotPassword);
router.post('/signup', jsonparsor, authenticate.signup);
router.post('/adminSignup', jsonparsor, authenticate.customSignup);
router.post('/users/resetPassword/:token', jsonparsor, authenticate.changeOfPassword);
router.post('/adminsPasswordReset/:userId',jsonparsor, authenticate.resetPassword )

router.get('/getAllAdmins', jsonparsor, protect.protectRoute, protect.restrictTo('super-admin'), authenticate.getAllAdmins)
      // Forum routes
router.post('/postQuestion',jsonparsor,protect.protectRoute, protect.restrictTo('student'),  forumjs.postQuestion);
router.put('/editQuestion', jsonparsor, protect.protectRoute, jsonparsor, protect.restrictTo('student'),  forumjs.editQuestion);
router.post('/rateQuestion', jsonparsor, protect.protectRoute,protect.restrictTo('student'), forumjs.rateQuestion);
router.delete('/removeQuestion', jsonparsor,protect.protectRoute, protect.restrictTo('student'), forumjs.removeQuestion);
router.post('/reportQuestion', jsonparsor,protect.protectRoute, protect.restrictTo('student'), forumjs.makeReport);
router.get('/allquestions', jsonparsor, forumjs.allQuestionsbyDate);    
      // Information routes
router.post('/postEvent/:userId', jsonparsor, upload, protect.protectRoute, protect.restrictTo('info-director'),events.addEvents );
router.get('/getEvent', jsonparsor, upload,events.getAllEvents );
router.delete('/removeEvent/:id', jsonparsor, protect.protectRoute, protect.restrictTo('info-director'), events.deleteEvent );
    
      //Club Routes
router.post('/addnewclub/:userId', jsonparsor, upload, protect.protectRoute, protect.restrictTo('club-president'), club.addNewClub );
router.post('/applytoclub/:userId', jsonparsor, protect.protectRoute, protect.restrictTo('student'), club.applyToClub );
router.get('/getallclubs', jsonparsor, club.getAllClubs);
router.get('/getclubmembers', jsonparsor, club.getClubMembers);
router.post('/studentApplyClub/:userId', jsonparsor, protect.protectRoute, protect.restrictTo('student'), club.studentApplyClub);
router.get('/notifyCP', jsonparsor, protect.protectRoute, protect.restrictTo('club-president'), club.notifyCP);
router.post('/approveApplicant', jsonparsor, protect.protectRoute, protect.restrictTo('club-president'), club.approveApplicant);
router.get('/myClubs/:userId', jsonparsor, protect.protectRoute, protect.restrictTo('student'), club.myClubs)
router.post('/approveApplicant/:userId', jsonparsor, protect.protectRoute ,protect.restrictTo('club-president'), club.approveApplicant);
router.delete('/deleteMember/:userId', jsonparsor, protect.protectRoute, protect.restrictTo('club-president'), club.deleteMember)
//router.get('/myClubs/:userId', jsonparsor, protect.protectRoute, protect)
module.exports = router;