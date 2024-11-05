const express = require('express');
const app = express();

//load config from env file
require("dotenv").config();

const PORT = process.env.PORT || 4000;

//middleware to parse json request
app.use(express.json());

//import routes for todo API
const todoRoutes = require("./Routes/todoRoute");

//mount the todo ASPI routes
app.use("/api/v1" , todoRoutes)

//start the server
app.listen(PORT , () =>{
    console.log(`App is running sucessfully ${PORT}`);
})

//connection to database
const dbConnect = require("./config/database");
dbConnect();

//default Route
app.get("/" ,(req,res) =>{
    res.send(`<h1> This is the HomePage </h1>`)
})