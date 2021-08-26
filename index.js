const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const router = require('./router.js');
const cors = require('cors')
//require("dotenv").config();

app.use(bodyparser.urlencoded({
    extended: true
  }) );

  app.use(express.json());
  app.use(cors());
  app.use(function (err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "OPTIONS, DELETE, PUT, GET, POST")
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, X-Requested-With, Accept")
    res.status(500).send('Something broke!')
  // console.log("kkkjjjjjj")
    next();
  })
app.use('/api', router);


//if (process.env.NODE_ENV === 'development'){}

const port = process.env.port || 8888;
app.listen(port, ()=>{
    console.log("   Server Running at " + port)
})