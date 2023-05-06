import axios from 'axios'

let {createSlice} =require('@reduxjs/toolkit')

export const ProductsData=createSlice({
    name:'ProductData',
    initialState: {
        value:[]
    },
    reducers:{
        setProduct:(state,action)=>{
            state.value=action.payload
        },
        addProduct:(state,action)=>{
            console.log(action.payload)
            state.value=[
                ...state.value,
                action.payload
            ]
        },deleteProduct:(state,action)=>{
            state.value=state.value.filter((ele)=>{
                return ele.pid!=action.payload
            })
        }
    }
})



export const {setProduct,addProduct,deleteProduct} = ProductsData.actions


export let getProductAsync=()=>async(dispatch)=>{
    let product=await axios.get(`${process.env.REACT_APP_SERVER_URL}products/getData`);
    if(product.status==201 && product.data.error.length==0)
    {
        dispatch(setProduct(product.data.productData));
    }
}