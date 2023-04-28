import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../../../../reduxConf/slices/Products';

export default function AddProducts() {
  const navigate=useNavigate()
  let userData=useSelector(state=>state.Auth.value)
  const dispatch=useDispatch()
  const [productData,setProductData]=useState({
    name:"",
    price:"",
    desc:"",
    sel:"",
  })
  let [img,setImg]=useState(null);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(img);
    // let file=document.getElementById(img)
    // console.log(file)
    let formData=new FormData();
    formData.append('name',productData.name);
    formData.append('price',productData.price);
    formData.append('description',productData.desc);
    formData.append('category',productData.sel);
    formData.append('filename',img.fileData)
    formData.append('file',img.selFile);
    const resp=await axios.post('http://localhost:4000/admin/addProducts',formData,{
      headers: {
        'Authorization': `token ${userData.accessToken}`,
        'content-type': 'multipart/form-data'
      },
      
    })
    // let resp=userData;
    
    console.log(resp);
    dispatch(addProduct(resp.data.data));
    setTimeout(()=>{
        navigate('/app')
    },2000)
  }
  const handleOnChange=(e)=>{
    const name=e.target.name;
    let value=e.target.value;
    console.log(typeof(value))
    if(value=="")
    {
      value=e.target.innerHTML;
    }
    setProductData((prev)=>({
      ...prev,
      [name]:value
    }))
  }
  const handleImage=(e)=>{
    // const name=e.target.name;
    const val=e.target.files[0];
    const val2=e.target.value;
    setImg({
      selFile:val,
      fileData:val2
    })
  }
  return (
    <>
      <form action="/admin/AddProducts" method="post" enctype="multipart/form-data" align="center" class="adminForm" onSubmit={handleSubmit}>
        <div class="m-5 mb-2">
            <input type="text" placeholder="name" name="name" class="form-control inp" onChange={handleOnChange} required/>
        </div>
        <div class="m-5 mb-2">
            <input type="number" placeholder="price" name="price" class="form-control inp" onChange={handleOnChange} required/>
        </div>
        <div class="m-5 mb-2">
            <textarea type="text" placeholder="description use || for multiple" name="desc" onChange={handleOnChange} class="form-control inp" rows="6" required></textarea>
        </div>
        <div class="m-5 mb-2">
            <input type="file" name="img" id='img' class="form-control inp" onChange={handleImage} required/>
        </div>
        <div class="m-5 mb-2">
            <select name="sel" id="" class="form-control inp  " onChange={handleOnChange} required>
                <option value="">please select from list</option>
                <option value="protiens">protien</option>
                <option value="gainers">gainer</option>
                <option value="vitamins">vitamin</option>
                <option value="fitness">fitness</option>
                <option value="powder">powder</option>
                <option value="steroids">steroids</option>
            </select>
        </div>
        <button type="submit" class="btn btn-primary mb-3 ">Add Pro</button>
    </form>

    </>
  )
}
