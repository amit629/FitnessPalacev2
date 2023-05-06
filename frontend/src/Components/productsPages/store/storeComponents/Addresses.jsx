import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom';

function AddForm({setA,setAdd}){
    let [addData,setAddData]=useState({
        custName:'',
        HouseNo:'',
        locality:'',
        Pincode:'',
        District:'',
        State:'',
        Mobile:0
    })
    let handleOnChange=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setAddData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
    let handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(addData)
        let addAdd=await axios.post(`${process.env.REACT_APP_SERVER_URL}addAddress`,addData,{
            headers:{
                'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        })
        setAdd((prev)=>{
         return [
            ...prev,
            addAdd.data.address
         ]   
        })
        console.log(addAdd.data.address)
        setA((prev)=>{
            return false;
        })
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} align="center">
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='name' name='custName' onChange={handleOnChange} required />
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='House No/Flat No' name='HouseNo' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='locality' name='locality' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='pincode' name='Pincode' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='District' name='District' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='State' name='State' onChange={handleOnChange} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" minLength={10} maxLength={10} placeholder='Mobile no' name='Mobile' onChange={handleOnChange} required/>
                </div>
                <button className='btn btn-danger'>Add</button>
            </form>
        </>
    )
}
function EditForm({formData,setE,setAdd}){
    let [addData,setAddData]=useState({
        custName:formData.custName,
        HouseNo:formData.HouseNo,
        locality:formData.locality,
        Pincode:formData.Pincode,
        District:formData.District,
        State:formData.State,
        Mobile:formData.Mobile
    })
    let handleOnChange=(e)=>{
        let name=e.target.name;
        let val=e.target.value;
        setAddData((prev)=>({
            ...prev,
            [name]:val
        }))
    }
    let handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(addData)
        console.log(formData.aid);
        let addAdd=await axios.put(`${process.env.REACT_APP_SERVER_URL}editAddress/${formData.aid}`,addData,{
            headers:{
                'Authorization':`token ${JSON.parse(localStorage.getItem('login')).accessToken}`
            }
        })
        setAdd((prev)=>{
            // let fil=prev.filter((ele)=>{
            //     return ele._id!=formData._id;
            // })
            let ind=prev.map(e=>e._id).indexOf(formData._id);
            prev[ind]=addAdd.data.address;
         return [
            ...prev
         ]   
        })
        console.log(addAdd.data.address)
        setE((prev)=>{
            return false;
        })
    }
    return(
        <>
            <form action="" onSubmit={handleSubmit} align="center">
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='name' name='custName' onChange={handleOnChange} value={addData.custName} required />
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='House No/Flat No' name='HouseNo' onChange={handleOnChange} value={addData.HouseNo} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='locality' name='locality' onChange={handleOnChange} value={addData.locality} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='pincode' name='Pincode' onChange={handleOnChange} value={addData.Pincode} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='District' name='District' onChange={handleOnChange} value={addData.District} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" placeholder='State' name='State' onChange={handleOnChange} value={addData.State} required/>
                </div>
                <div className="m-5 mb-2">
                    <input type="text" className="form-control" minLength={10} maxLength={10} placeholder='Mobile no' name='Mobile' value={addData.Mobile} onChange={handleOnChange} required/>
                </div>
                <button className='btn btn-danger'>Add</button>
            </form>
        </>
    )
}

export default function Addresses() {
    let addData=useLoaderData();
    console.log(addData)
    let [add,setAdd]=useState(false);
    let [edit,setEdit]=useState(false);
    let [adresses,setAdresses]=useState(addData.addressData.address)
    let [formData,setFormData]=useState()
    let setEditOn=(data)=>{
        setFormData((prev)=>{
            return data;
        })
        setEdit((prev)=>{
            return true;         
        });
    }
  return (
    <>
    <div className='container-fluid m-0 p-0' style={{position:'absolute',top:"10vh"}}>
      <div className="row">
            <div className="col-6">
            {
                add?(
                    <AddForm setA={setAdd} setAdd={setAdresses}/>
                ):(
                    edit?(
                        <>
                            <EditForm formData={formData} setE={setEdit} setAdd={setAdresses}/>
                        </>
                    ):(
                        <>
                            <button className='btn text-danger' onClick={()=>{setAdd(()=>{return true})}} style={{width:"5vw"}}>Add &nbsp;<i class="fa-solid fa-pen-to-square"></i></button>
                            <div class="row">
                                {
                                    adresses.map((ele)=>{
                                        return(
                                            <>
                                            <p></p>
                                            
                                                <div class="col-md-8">
                                                    <div class="bg-white card addresses-item mb-4 border border-primary shadow">
                                                        <div class="gold-members p-4">
                                                            <div class="media">
                                                                <div class="mr-3"><i class="icofont-ui-home icofont-3x"></i></div>
                                                                <div class="media-body">
                                                                    <h6 class="mb-1 text-secondary">Home</h6>
                                                                    <p class="text-black">{ele.custName} , {ele.HouseNo} , {ele.locality} , {ele.Pincode} , {ele.District} , {ele.State} , {ele.Mobile}</p>
                                                                    <p class="mb-0 text-black font-weight-bold"><span class="text-primary mr-3" data-toggle="modal" data-target="#add-address-modal" onClick={()=>{setEditOn(ele)}}><i class="icofont-ui-edit"></i> EDIT</span> <span class="text-danger" data-toggle="modal" data-target="#delete-address-modal" href="#"><i class="icofont-ui-delete"></i> DELETE</span></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </>
                    
                    )
                )
            }
            </div>
            <div className="col-6"></div>
      </div>
    </div>
    </>
  )
}
