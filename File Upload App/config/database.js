const mongoose = require('mongoose');
require('dotenv').config();

exports.DB_connect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(console.log("DB connection successfull"))
    .catch((err) => {
        console.log(err);
        console.log("DB connection issues");
        process.exit(1);
    })
}
