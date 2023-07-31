// const { log } = require('console');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { log, error } = require('console');
const nocache = require('nocache')

const app = express();

app.use(nocache());

dotenv.config({path: 'config.env'})
const PORT = process.env.PORT ||8080

// mongo db connection
async function connectToMongo() {
    try {
      await mongoose.connect("mongodb://127.0.0.1:27017/crud_app");
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.log(error);
    }
  }
  
  connectToMongo();

//log requests
app.use(morgan('tiny'));

//parse request to body-parser
app.use(bodyparser.urlencoded({extended : true}))

//set view engine
app.set("view engine","ejs")

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

// loads routes
app.use('/',require('./server/routes/router'))


app.listen(3000,() =>{console.log(`server is running at http://localhost:${PORT}`)})