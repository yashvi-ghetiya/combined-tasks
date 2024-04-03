const express = require('express');
const router = require('./router.js');
let cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('views', './views');
app.use(cookieParser());
app.set('view engine', 'ejs');

app.listen((process.env.port),(error)=>{
    if(error) 
        console.log(error);
    else
    {
        console.log("Server is Running") 
        console.log("http://localhost:"+process.env.port+"/");
        app.use('/',router);
    }
});
