import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDataAsync, getMoreGymDataAsync } from '../../../../reduxConf/slices/NearyGym';
import NearByCards from './NearByCards';
import AllGymMaps from './AllGymMaps';
import SpinnerAnim from './smallComponents/SpinnerAnim';

export default function NearbyPlaces() {
  const dispatch=useDispatch();
  const dataFetchedRef = useRef(false);
  // const dataFetchedRef = useRef(false);
  useEffect(()=>{
    if (dataFetchedRef.current) return;
      dataFetchedRef.current = true;
      // console.log(gymData)
    if(gymData.length==0)
    {
      dispatch(getDataAsync());
    }
    
  },[])
  let gymData=useSelector((state)=>state.nearbygymdata.value);
  gymData = gymData.slice().sort((a, b) => b.rating/b.user_ratings_total||0 - a.rating/a.user_ratings_total||0)
  

  // gymData.sort((a,b)=>{
  //   return a.rating-b.rating
  // })
  // console.log(gymData[0])
  let moreDataFun=()=>{
    dispatch(getMoreGymDataAsync())
  }
  return (
    <>
      
      {gymData.length!=0?<div className="container-fluid">
        
        <div className="row">
          <div className="col-5">
            {gymData.length!=0?<><AllGymMaps placeData={gymData}/><button className='btn btn-secondary mt-3' onClick={moreDataFun}>Show More Gym</button></>:<h1></h1>}
            
          </div>
          <div className="col-7 nearByCardsSpecialClass">
            <h1 className='ms-5 mt-4'>Near By Gyms</h1>
            {
            gymData.length!=0?
                <div className="row">
                
                  {
                    gymData.map((ele,ind)=>{
                      
                        return <div className="col-5 ms-5">
                          <NearByCards data={ele} key={ind}/>
                        </div>

                    })
                  }
                
              </div>
              :<h1>loading...</h1>
          }
              
            
          </div>
        </div>

      
    </div>:<SpinnerAnim/>}
    </>
  )
}
