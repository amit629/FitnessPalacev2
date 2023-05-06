import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { pushPlaces } from '../../../../../reduxConf/slices/NearyGym';
import Rating from './Rating';
import SpinnerAnim from './SpinnerAnim';
import dummy1 from '../../css/dummy1.jpg'
import dummy2 from '../../css/dummy2.jpg'
import dummy3 from '../../css/dummy3.jpg'



export default function AboutGymCards({data}) {
    console.log(data);
    const dataFetchedRef = useRef(false);
    // const refSta=useRef(false);
    const [imageSource,setImageSource]=useState([])
    
    
    let testFun=async()=>{
        if(imageSource.length==0 && !data.photos)
        {
            setImageSource((prev)=>{
                return [dummy1,dummy2,dummy3]   
            })
            return;
        }
        let imgs=[data.photos[1],data.photos[2],data.photos[3]]     
        imgs.forEach(async(ele)=>{
            const photoRef=ele.photo_reference;
            const proxy="http://localhost:8080/"
            let response=await fetch(proxy+`https://maps.googleapis.com/maps/api/place/photo?maxwidth=${500}&maxheight=${500}&photo_reference=${photoRef}&key=${process.env.REACT_APP_TOKEN}`).then(r=>r.blob())
    
            let imgUrl=URL.createObjectURL(response)
            setImageSource((prev)=>{
                return [...prev,imgUrl]
            })
        })   

    }
    useEffect(()=>{
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
            // if(testFun.photos)
            // {
            testFun();
        // }
        
    },[])

    if(data==undefined)
    {
        return <h1>Wait</h1>
    }
  return (
    <>
        <div className="container-fluid">
            {imageSource.length==0 ?<SpinnerAnim/>:<div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
                {
                    imageSource.map((ele,ind)=>{
                        return (
                            ind==0?<div className="carousel-item active">
                            <img src={ele} className="sp-img d-block w-100" alt="..." key={ind}/>
                        </div>:<div className="carousel-item ">
                                <img src={ele} className="sp-img d-block w-100" alt="..." key={ind}/>
                            </div>
                        )
                    })
                }
                
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>}
                
            <div className="AboutText mt-2 ms-2">
                <h2>{data.name}</h2>
                <p>{data.current_opening_hours==undefined?'Not Operational':data.current_opening_hours.open_now?<span className='text-success'>open now</span>:<span className='text-danger'>Closed</span>}</p>
                <p>{data.formatted_address}</p>
                <p>{data.formatted_phone_number}</p>
                <Rating rating={data.rating}></Rating>
                {
                    data.rating && <span>{`(${data.user_ratings_total})`}</span>
                }

            </div>
            

            {
                data.current_opening_hours!=undefined?<>
                    <div >
                        <hr />  
                        <span>Timmings</span>
                        <ul>
                            {  
                                data.current_opening_hours.weekday_text.map((ele,ind)=>{
                                    return <li key={ind}>{ele}</li>
                                })
                            }        
                        </ul>
                        
                    </div>  
                </>:<>
                    <div>
                        Timmings not available        
                    </div>
                </>
            }

        </div>
    </>
  )
}
