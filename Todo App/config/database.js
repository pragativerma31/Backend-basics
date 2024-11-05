const mongoose = require('mongoose');
require("dotenv").config();

const dbConnect =()=>{
    mongoose.connect(process.env.DB_URL)
    .then(() => {console.log("Connection Succesfull to Database")})
    .catch((error) =>{
        console.log("Issue in connection");
        console.log(error.message);
        process.exit(1);
    })
}

module.exports = dbConnect;
