const mongoose = require('mongoose');

require('dotenv').config();

exports.DB_Connect = () =>{
    mongoose.connect(process.env.DB_URL)
    .then( () => {console.log('DB connected successfully')})
    .catch( (err) => {
        console.log("DB connection unsuccessfull")
        console.log(err);
        process.exit(1);
    })
}