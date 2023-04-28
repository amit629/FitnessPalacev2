const express=require('express')
const ProductModel=require('../../model/Product')
const path=require('path')
const Router=express.Router();


Router.get('/products/getData',async (req,res)=>{

    const {_filt}=req.query;
    let err=[];
    let data="";
    try{
        if(_filt==undefined)
        {
            data=await ProductModel.find({})
        }
        else{
            data=await ProductModel.find({category:_filt})
        }
    }
    catch(e)
    {
        err.push(e);
    }
    // const data=await ProductModel.find({}).limit(20);
    res.status(201).json({
        productData:data,
        error:err
    })
 
})
Router.get('/products/getData/:id',async(req,res)=>{
    const {id}=req.params;
    let err=[];
    try{
        var data=await ProductModel.findById(id);
        var morePro=await ProductModel.find({category:data.category,_id:{"$ne":id}}).limit(4);
    }
    catch(e)
    {
        err.push(e);
    }
    console.log(morePro)
    res.json({
        productData:data,
        moredata:morePro,
        error:err
    })
})
module.exports=Router