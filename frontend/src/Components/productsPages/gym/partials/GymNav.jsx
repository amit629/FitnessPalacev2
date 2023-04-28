import React from 'react'
import { Link } from 'react-router-dom'

export default function GymNav() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark" style={{height:'70px'}}>
          <div className="container-fluid">
            <Link className="navbar-brand" to='/'>Fitness Palace</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/app/nearByGym">Home</Link>
                </li>
                
              </ul>
              <ul className="navbar-nav me-5">
                <li className="nav-item">
                  <Link className="nav-link active btn btn-secondary text-white" aria-current="page" to="/">Login</Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="nav-link active btn btn-secondary text-white" aria-current="page" to="/">Register</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    </>
  )
}
