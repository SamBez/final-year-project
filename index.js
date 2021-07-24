const express = require('express');
const mongoose = require('mongoose')
const app = express();


mongoose.connect('mongodb://localhost:27017/asaas', {useNewUrlParser: true}, (error)=>{
    if (error){
        console.log("DB not connected!")
    }
    else{
        console.log(" Successfuly connected")
    }
});

const port = process.env.port || 8888;
app.listen(port, ()=>{
    console.log("   Server Running! ")
})