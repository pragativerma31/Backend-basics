const express = require('express');
const router = express.Router();

const {createTodo} =require("../controllers/createTodo");

const {getTodos , getTodo} =require("../controllers/getTodos");

const {updateTodo } = require("../controllers/updateTodo");

const {deleteTodo } = require("../controllers/deleteTodos");

router.post("/createTodo" , createTodo);
router.get("/getTodos" , getTodos );
router.get("/getTodo/:id" , getTodo );
router.put("/updateTodo/:id" ,updateTodo);
router.delete("/deleteTodo/:id" , deleteTodo);

module.exports = router;