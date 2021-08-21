const express = require('express');
const mongoose = require('mongoose')
const app = express();
const bodyparser = require('body-parser');
const router = require('./router.js');
//require("dotenv").config();

app.use(bodyparser.urlencoded({
    extended: true
  }) );


app.use('/api', router);
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })
//if (process.env.NODE_ENV === 'development'){}

const port = process.env.port || 8081;
app.listen(port, ()=>{
    console.log("   Server Running! ")
})