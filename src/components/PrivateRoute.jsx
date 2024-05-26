import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthcontexts } from '../context/Authcontexts'

export default function PrivateRoute({ Component, allowedRoles = [] }) {

    const { isAuthenticated, user } = useAuthcontexts()

    const location = useLocation()

    const accessedRole = allowedRoles.some((rule) => user.roles.includes(rule))

    if (!isAuthenticated)
        return <Navigate to="/auth/login" state={{ from: location.pathname }} replace />

    if (!allowedRoles.length || accessedRole)
        return (
            <Component />
        )

    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
            <div className='text-center'>
                <h1 className='text-danger'>403!</h1>
                <h3 className='text-danger'>Access Denied</h3>
                <h4>Sorry! But You don't have permission to access this page...</h4>
            </div>
        </div>
    )
}
