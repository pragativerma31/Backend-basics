const express = require('express');
const app = express();

app.listen(3000 , () => {
    console.log("started at port no 3000")
});

const Bodyparser = require('body-parser');

app.use(Bodyparser.json());

app.post('/api/cars', (req , res) =>{
    const {name , brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("car submitted ")
})

// const mongoose = require('mongoose');
// mongoose.