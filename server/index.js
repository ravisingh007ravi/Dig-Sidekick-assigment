const express = require('express');
const mongoose = require('mongoose');
// const route = require('./routes/route.js');
const dotenv = require('dotenv');
const cors = require('cors');
mongoose.set('strictQuery', false);
require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

const userName = process.env.UserNameDB;
const passWord = process.env.PassWordDB;

const DB = `mongodb+srv://${userName}:${passWord}@cluster0.hz8vozb.mongodb.net/Dig_Sidekick?retryWrites=true&w=majority`;
const port = process.env.PORT || 5000;


//MongoDB
mongoose.connect(process.env.MONGODB_URI || DB)
    .then(() => console.log("Mongoose is Connected😊😊"))
    .catch((err) => console.log(err));


// app.use('/', route);

app.listen(port, () => console.log(`Server is Running Succesfully ${port}💕`));