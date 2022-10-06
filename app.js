
const express=require('express');
const app=express();
const bodyParser= require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db=require('./db/config');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

app.use(require('./router/route'));

app.listen(process.env.PORT || 8080);