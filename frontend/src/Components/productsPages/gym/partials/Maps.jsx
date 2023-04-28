import { useEffect, useMemo, useState } from 'react';
import { GoogleMap,useLoadScript,MarkerF} from '@react-google-maps/api';

export default function Maps({placeData}){
    const {isLoaded}=useLoadScript({
        googleMapsApiKey:process.env.REACT_APP_MAP_API,    
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
    const center=useMemo(()=>({lat:placeData.geometry.location.lat,lng:placeData.geometry.location.lng}),[]);
    return (
        <GoogleMap zoom={14} center={center} mapContainerClassName='sp-css' >
            <MarkerF position={center} />
        </GoogleMap>
    )
}