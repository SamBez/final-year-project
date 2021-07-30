var express = require('express')
const authenticate = require('./controls/authentication')
const router = express.Router();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

var urlencoder = bodyparser.urlencoded({
   extended:true
 })
var jsonparsor = bodyparser.json();
 mongoose.connect('mongodb://localhost:27017/asaas', {useNewUrlParser: true}, (error)=>{
   if (error){
       console.log("DB not connected!")
   }
   else{
       console.log(" Successfuly connected")
   }
});

router.post('/login',jsonparsor,  authenticate.login);
router.get('/', (req, res)=>{
   res.send('addproduct');
}); 

router.post('/signup', jsonparsor, authenticate.signup);

module.exports = router;