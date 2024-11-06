//app create
const express = require('express');
const app = express();

//database connection
const {DB_connect} = require('./config/database');
DB_connect();

//add middleware
app.use(express.json());
const fileupload =  require('express-fileupload');
app.use(fileupload({
    useTempFiles:true
}));

//mount base api
const fileRoutes = require('./Routes/FileUpload');
app.use('/api/v1' , fileRoutes);

//cloud connect
const {Cloudinary_Connect} = require('./config/cloudinary');
Cloudinary_Connect();

//activate server
const PORT = process.env.PORT || 4000;
app.listen(PORT , () => {
    console.log(`App started at ${PORT}`);
})

