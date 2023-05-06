let express=require('express');
const { verifyAuth, isSuperAdmin } = require('../../adminMiddleWares/middle');
const WorkoutModel = require('../../model/Workout');
const {v4:uuid}=require('uuid')     
let Router=express.Router();

Router.get('/workout',async(req,res)=>{
    let data=await WorkoutModel.find({});
    res.json({
        data:data
    })
})              


module.exports=Router;

