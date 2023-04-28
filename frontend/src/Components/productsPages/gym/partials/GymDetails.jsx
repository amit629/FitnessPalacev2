import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import { useGeolocated } from "react-geolocated";
import Maps from './Maps';
import { useSelector } from 'react-redux';
import GymReviewCard from './smallComponents/GymReviewCard';
import AboutGymCards from './smallComponents/AboutGymCards';

export default function GymDetails() {
    const gymdata=useLoaderData();
  return (
    
    <>
        {console.log(gymdata)}
        
        <div className="container-fluid mt-2">
          <div className="row">
            <div className="col-5 aboutGymContainer">
                <AboutGymCards data={gymdata}/>
            </div>
            <div className="col"></div>
            <div className="col-6 ">
              <div className="row">
                <div className="col">
                  <Maps placeData={gymdata} />
                </div>
              </div>
              <div className="row">
                <div className="col rm-scroll" style={{height:'40vh',overflow:'auto'}}>
                  {
                    gymdata.reviews.map((ele,ind)=>{
                        return <GymReviewCard review={ele} key={ind}/>
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}
