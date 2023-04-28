import React from 'react'
import { useRouteError } from 'react-router-dom';

export default function NotFound() {
  let error = useRouteError();
  console.log(error)
 
  return (
    <div className='container-fluid d-flex justify-content-center align-item-center'>
        {error==undefined?<h1>Sorry Page Does Not Exist</h1>:<h1>{error.Error}</h1>}
    </div>
  )
}
