import axios from 'axios'

let {createSlice} =require('@reduxjs/toolkit')
export const Order=createSlice({
    name:'order',
    initialState:{
        value:{
            address:{
                billingAddress:"",
                shippingAddress:""
            },
            Products:'',
            paymentStatus:'',
            paymentMethod:'',   
            total:0
        }
    },
    reducers:{
        updateBillingAdd:(state,action)=>{
            state.value.address.billingAddress=action.payload;
            
        },updateShippingAdd:(state,action)=>{
            state.value.address.shippingAddress=action.payload;

        },UpdateProducts:(state,action)=>{
            state.value.Products=action.payload;
        },  
        UpdatePayment:(state,action)=>{
            state.value.paymentStatus=action.payload;
        },UpdatePaymentMethod:(state,action)=>{
            state.value.paymentMethod=action.payload;
        },
        UpdateTotal:(state,action)=>{
            state.value.total=action.payload;
        }
    
    }   
})

export const {updateBillingAdd,updateShippingAdd,UpdateProducts,UpdatePayment,UpdateTotal,UpdatePaymentMethod} = Order.actions