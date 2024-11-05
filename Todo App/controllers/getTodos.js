const Todo = require("../Models/TodoSchema");

exports.getTodos = async(req,res) => {
    try{
       const AllTodos = await Todo.find({});

       res.status(200).json({
        success:true,
        data:AllTodos,
        message:"All data is fetched"
       })

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server Error",
        })

    }
}

exports.getTodo = async(req,res) => {
    try{
       const id = req.params.id;
       const todo = await Todo.find({_id : id})

       if(!todo){
        res.status(404).json({
            success:false,
            message:"Data Not Found"
        })
       }
       else{
        res.status(200).json({
            success:true,
            data:todo,
            message:"data is fetched"
        })
       }

    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Server Error",
        })

    }
}