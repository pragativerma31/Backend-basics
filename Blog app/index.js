const express = require('express');
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const ConnectWithDB = require("./config/database");
ConnectWithDB();

const Blog = require("./Routes/Blog");
app.use("/api/v1",Blog);

app.listen(PORT , () =>{
    console.log(`App is started at ${PORT} successfully `);
})