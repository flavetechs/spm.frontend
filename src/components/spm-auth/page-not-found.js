import React from 'react'
import { useHistory } from 'react-router-dom'
import { authLocations } from '../../router/spm-path-locations';

const PageNotFound = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
    <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
        <p className="lead">
            This page doesn't exist! Try entering the right URL.
          </p>
    </div>
</div>
  )
}

export default PageNotFound