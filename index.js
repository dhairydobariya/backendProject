const express = require('express');
const app = express()
const route = require('./route/route')
const port = 3001;
const body_parser = require('body-parser')      
const mongoose = require('./db/userdb')
const path = require('path')
app.set('view engine' , 'ejs')
app.use(body_parser.urlencoded({extended: true}))
app.use(express.static(__dirname + '/assets'));
app.use('/' , route)

app.use('/views/uploads' , express.static('./views/uploads'));
mongoose
app.listen(port , (req , res) =>{
    console.log("this is a noe runing properly in port 3001");
})
    