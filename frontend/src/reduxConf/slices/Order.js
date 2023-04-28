import axios from 'axios'

let {createSlice} =require('@reduxjs/toolkit')
export const Order=createSlice({
    name:'order',
    initialState:{
        value:{
            address:'',
            total:'',
            paymentMethod:'',
            deliveryData:''
        }
    },
    reducers:{
        UpdateOrder:(state,action)=>{
            state.value.address=action.payload.address;
            state.value.total=action.payload.total;
        },
        UpdatePayment:(state,action)=>{
            state.value.paymentMethod=action.payload;
        },
        UpdateDelivery:(state,action)=>{
            state.value.deliveryData=action.payload
        }
    }   
})

export const {UpdateOrder,UpdateDelivery,UpdatePayment} = Order.actions