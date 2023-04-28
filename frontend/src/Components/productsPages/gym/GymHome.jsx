import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import GymNav from './partials/GymNav'
import SpinnerAnim from './partials/smallComponents/SpinnerAnim'
import { useSelector } from 'react-redux'




export default function GymHome() {
    
  return (
    <>
        <header>
            <GymNav/>
        </header>
        <main>
            <div className="container-fluid">
                <Outlet/>
            </div>
        </main>
        
    </>
  )
}
