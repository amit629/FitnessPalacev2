import { useEffect, useMemo, useState } from 'react';
import { GoogleMap,useLoadScript,MarkerF} from '@react-google-maps/api';

export default function AllGymMaps({placeData}){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:process.env.REACT_MAP_API,    
    });

    if(!isLoaded)return <div>loading...</div>
    
    return(
        <>
            <Map placeData={placeData}/>
        </>
    )
}
function Map({placeData}){
    // console.log(placeData.geometry.location.lat)
    const center=useMemo(()=>({lat:placeData[0].geometry.location.lat,lng:placeData[0].geometry.location.lng}),[]);
    return (
        <GoogleMap zoom={13} center={center} mapContainerClassName='sp-css-two mt-5' >
            {
                placeData.map((ele,ind)=>{
                    let pos={
                        lat:ele.geometry.location.lat,
                        lng:ele.geometry.location.lng
                    }
                    return(
                        <MarkerF position={pos} title={ele.name} key={ind*100}></MarkerF>
                    );
                })
            }
        </GoogleMap>
    )
}