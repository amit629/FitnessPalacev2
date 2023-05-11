const express=require('express')
const ProductModel=require('../../model/Product')
const path=require('path')
const Router=express.Router();
let {verifyAuth} =require('../../adminMiddleWares/middle');
const { stripe_publishable_key, stripe_secret_key } = require('../../tokens');
const orderModal = require('../../model/Order');
let {v4:uuid}=require('uuid');
const userModal = require('../../model/User');
const orderPro = require('../../model/OrderProduct');


let stripe=require('stripe')(stripe_secret_key)

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
        var data=await ProductModel.findById(id).populate('author');
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
Router.get('/config',verifyAuth,(req,res)=>{
    res.send({
        publishableKey:stripe_publishable_key,
    });
})
Router.post("/create-payment-intent",verifyAuth, async (req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    try{
            let user=req.user;
            let { items,total,address } = req.body;
            console.log(req.body)

            const paymentIntent = await stripe.paymentIntents.create({  
                amount: total,
                currency: "inr",
                automatic_payment_methods: {
                    enabled: true,
                }
            });
        
            res.json({
                clientSecret: paymentIntent.client_secret,
                data:paymentIntent,
                orderData:{
                    item:items,
                    billingAddress:address.billingAddress,
                    shippingAddress:address.shippingAddress ,
                    total:total
                }
            });
    }catch(e){
        res.status(400).json({
            error:{
                message:e.message,
            }
        })
    }
  })
  Router.post("/createOrder",verifyAuth,async(req,res)=>{
    try{
        let user=req.user;
        let {paymentMethod,status,aboutOrder,clientSecret}=req.body;
        
                                                                            
        let newOrder=new orderModal();
       
        newOrder.oid=uuid();
        aboutOrder.item.forEach(async(ele)=>{
            let pros=new orderPro();                                  
            pros.productId=ele.item._id,
            pros.quantity=ele.quantity
            await pros.save();                              
            newOrder.orderData.push(pros._id);
        })                        
        newOrder.OrderValue=aboutOrder.total;
        newOrder.shippingAddress=aboutOrder.shippingAddress;
        newOrder.billingAddress=aboutOrder.billingAddress;
        if(newOrder.paymentMode!='cod')
        {
            newOrder.paymentStatus=status;  
        }
        newOrder.paymentMode=paymentMethod;
        if(status!='failed')
        {
            newOrder.deliveryStatus.currentState='order placed';
        }                
        console.log('hit')                                                             
        let userId=await userModal.findById(user.userExist._id);
        userId.orders.push(newOrder._id);

        let dataere=await newOrder.save();
        let dataret=await userId.save();    
        
        return res.status(200).json({
            oid:newOrder.oid
        })
    }catch(e){
        console.log(e)
        return res.status(404).json({
            err:'database me dikkat ho gayi'
        })
    }


  })
  Router.get('/orders/:oid',async(req,res)=>{
        try{
            let {oid}=req.params;
            console.log(oid)
            let userOrder=await orderModal.findOne({oid:oid}).populate({
                path:'orderData',
                populate:{path:'productId'}
            })
            console.log(userOrder)
            return res.status(200).json({
                data:userOrder
            })
        }catch(e){
            console.log(e)
            return res.status(404).json({
                err:'database me dikkat ho gayi'
            })
        }                               
  })
Router.get('/orders',verifyAuth,async (req,res)=>{
    let user=req.user;
    let userOrder=await userModal.findById(user.userExist._id).populate({
        path:'orders',
        populate:{path:'orderData',populate:{path:'productId'}}
    })
   
    res.status(200).json({
        data:userOrder.orders
    })
})
module.exports=Router