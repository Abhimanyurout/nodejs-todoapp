const ErrorHandler = require("../middlewares/error");
const Task = require("../models/task");
const user = require("../models/user");

module.exports.newTask= async (req,res,next)=>{
    try {
        const {title,description}=req.body;

        await Task.create({
        title,description,user:req.user,
    });

    res.status(201).json({
        success:true,
        meassage:"Task added Successfuly",
    });
    } catch (error) {
        next(error);
    }
};

module.exports.getMyTask= async (req,res,next)=>{
   try {
    const userid=req.user._id;

    const tasks=await Task.find({user:userid});

    res.status(201).json({
        success:true,
        tasks,
    });
   } catch (error) {
    next(error);
   }
};

module.exports.updateTask= async (req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);
        if(!task) return next(new ErrorHandler("Task is not found",404));
    
        task.isCompleted= !task.isCompleted;
    
        await task.save();
    
        res.status(201).json({
            success:true,
            task,
            message:"Task updated!"
        }); 
    } catch (error) {
        next(error);
    }
};

module.exports.deleteTask= async (req,res,next)=>{
    try {
        const task=await Task.findById(req.params.id);

        if(!task) return next(new ErrorHandler("Task is not found baby...",404));

        // if(!task){
        //     return res.status(400).json({
        //         success:false,
        //         message:"Task not found !"
        //     })
        // }

        await task.deleteOne();

        res.status(201).json({
            success:true,
            message:"Task deleted!"
        });
    } catch (error) {
        next(error);
    }
};