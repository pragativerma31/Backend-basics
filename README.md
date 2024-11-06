# Learning Backend Development with Node.js and Express

This repository is a collection of five applications I've built to solidify my backend development skills using Node.js, Express, MongoDB, and other essential tools. Each application covers various concepts, tools, and techniques, explained in detail below.

---

## Basics App

* ### Setting Up the Server
I learned how to set up an Express server, which acts as the foundation for all my backend applications. Setting up the server involves creating an instance of Express and defining a basic endpoint. This instance handles requests and sends responses, making it the core of any Express-based application.

#### *CODE*
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

* ### Middleware and JSON Parsing
To handle JSON data from client requests, I used the express.json() middleware. Middleware functions in Express process incoming requests and can modify the request or response objects before they reach the route handlers. This middleware is essential for parsing JSON bodies in request payloads.

#### *CODE*
app.use(express.json()); // Parses incoming requests with JSON payloads

app.post('/data', (req, res) => {
  console.log(req.body); // Access JSON data from request body
  res.send('Data received');
});

## Todo App
* ### Database Connection with Mongoose
In this app, I learned how to connect a Node.js application to MongoDB using Mongoose, an ODM (Object Data Modeling) library. Mongoose helps manage data structures and schema, making it easier to interact with MongoDB. The connection to MongoDB allows my app to persist data, and I use Mongoose models to define the schema for my data.

#### *CODE*
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todoDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

* ### Schema Definition and Exporting Models
Mongoose schemas allow me to define the structure of documents in a MongoDB collection. After defining a schema, I create and export a model based on that schema, which I can use to create, read, update, and delete items in the database.

#### *CODE*
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  task: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;

* ### Automatic Server Restart with Nodemon
To save time during development, I used Nodemon, which automatically restarts the server whenever I make changes to the code. This improves workflow by avoiding the need to manually restart the server after each change.

## Blog App
* ### Mounting Base URLs
I learned how to define a base URL for specific routes, which simplifies route management. Mounting a base URL allows me to organize endpoints and logically group routes, improving the structure of the API.

#### *CODE*
const blogRouter = require('./routes/blog');
app.use('/api/blogs', blogRouter); // Mounts all blog routes under /api/blogs

* ### Extracting Parameters from URLs
In the Blog App, I learned how to extract parameters from URLs. This approach allows me to dynamically handle requests and manipulate resources based on unique identifiers in the URL.

#### *CODE*
app.get('/api/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  // Use blogId to fetch and return specific blog data
});

* ### Environment Variables with dotenv
To store sensitive information securely, I used the dotenv package, which loads environment variables from a .env file. This practice enhances security by keeping API keys and database credentials outside of the codebase.

#### *CODE*
require('dotenv').config();

const DB_URI = process.env.DB_URI;
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

## Auth App
* ### Authorization and JWT
In the Auth App, I explored JSON Web Tokens (JWT) to handle user authentication. JWTs are signed tokens that verify a user’s identity, which are used to secure routes. I used jwt.sign to create tokens and jwt.verify to validate them for protected routes.

#### *CODE*
const jwt = require('jsonwebtoken');

// Generate a token
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

// Verify token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) return res.status(401).send('Unauthorized');
  req.user = decoded;
  next();
});

* ### Password Hashing with Bcrypt
To securely store user passwords, I used Bcrypt, which hashes passwords before saving them in the database. Bcrypt’s compare function verifies user-entered passwords against the stored hash.

#### *CODE*
const bcrypt = require('bcrypt');

// Hash password
const hashedPassword = await bcrypt.hash(userPassword, 10);

// Compare password
const isMatch = await bcrypt.compare(userPassword, storedHashedPassword);

* ### Protected Routes
Protected routes restrict access to authorized users. I implemented middleware to verify JWT tokens, ensuring only authenticated users can access certain routes.

#### *CODE*
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Unauthorized');
    req.user = decoded;
    next();
  });
};
app.use('/protected', authMiddleware);

* ### Database Connection with MongoDB Atlas
To deploy the app in the cloud, I connected to MongoDB Atlas, a cloud database service that simplifies database hosting and scaling.

## File Upload App
* ### Express-Fileupload Middleware
To handle file uploads in Express, I used the express-fileupload middleware. This middleware simplifies the process of receiving and managing files uploaded by clients.

#### *CODE*
const fileUpload = require('express-fileupload');
app.use(fileUpload());

app.post('/upload', (req, res) => {
  const file = req.files.file;
  file.mv(`./uploads/${file.name}`, err => {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

* ### Image and Video Management with Cloudinary
To store images and videos, I integrated Cloudinary, a cloud-based media management platform. This allows me to upload, store, and retrieve files with ease. Using Cloudinary's SDK, I can upload different types of files, including images and videos.

#### *CODE*
const cloudinary = require('cloudinary').v2;

cloudinary.uploader.upload(file.path, { resource_type: "image" }, (error, result) => {
  if (error) return res.status(500).send(error);
  res.json(result);
});

* ### Email Notifications with Nodemailer
To notify clients of successful uploads, I used Nodemailer to send email notifications. This service provides a way to automatically send updates, improving user experience and communication.

#### *CODE*
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const mailOptions = {
  from: process.env.EMAIL_USER,
  to: clientEmail,
  subject: 'File Uploaded Successfully',
  text: 'Your file has been uploaded successfully!'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) return console.log(error);
  console.log('Email sent: ' + info.response);
});


*Each application in this repository has contributed to my understanding of backend development, from basic server setup to implementing authentication and file handling. This journey has provided me with a solid foundation in building secure, scalable, and efficient backend systems.*