const mongoose = require('mongoose');
require('dotenv').config();

const ConnectWithDB = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(console.log("Connection made successfully"))
    .catch((err) => {
        console.error(err);
        console.log("Not Connected");
        process.exit(1);
    })
}

module.exports = ConnectWithDB;