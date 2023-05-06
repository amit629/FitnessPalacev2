import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Navbar from './workOutComponent/Navbar';
import './workout.css'

export default function WorkoutHome() {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <section  className='' style={{marginTop:'14vh'}} >
          <Outlet/>
      </section>
    </>
  )
}
