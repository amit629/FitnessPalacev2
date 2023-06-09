import React from 'react'

export default function Sidebar({sideBarRoutes,type}) {
  return (
    <>
        <div class="d-flex flex-column flex-shrink-0 p-3 " style={{width: "340px",height:'100%'}}>
            <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
            <svg class="bi me-2" width="40" height="32"><use xlinkHref="#bootstrap"></use></svg>
            <span class="fs-4">Filter</span>
            </a>
            <hr/>
            <ul class="nav nav-pills flex-column mb-auto">
            <li class="nav-item">
                <a href="#" class="nav-link active" aria-current="page">
                <svg class="bi me-2" width="16" height="16"><use xlinkHref="#home"></use></svg>
                Home
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-dark">
                <svg class="bi me-2" width="16" height="16"><use xlinkHref="#speedometer2"></use></svg>
                Dashboard
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-dark">
                <svg class="bi me-2" width="16" height="16"><use xlinkHref="#table"></use></svg>
                Orders
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-dark">
                <svg class="bi me-2" width="16" height="16"><use xlinkHref="#grid"></use></svg>
                Products
                </a>
            </li>
            <li>
                <a href="#" class="nav-link link-dark">
                <svg class="bi me-2" width="16" height="16"><use xlinkHref="#people-circle"></use></svg>
                Customers
                </a>
            </li>
            </ul>
            
           
        </div>
    </>
  )
}
