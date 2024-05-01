const express = require('express');
const app = express();
const dotenv= require("dotenv");
const cors = require("cors");

app.use(cors());

dotenv.config({path:'./config.env'});
require('./db/conn')
app.use(express.json());
app.use(require('./route/auth'));

app.get("/", (req, res) =>{
    res.send("hello");
})
app.listen(5000, ()=>{
    console.log("server is running");
});

