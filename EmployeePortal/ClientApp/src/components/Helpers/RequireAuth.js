import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = (Component) => (props) => {
    const IsLoggedIn = localStorage.getItem('myToken');
    if (!IsLoggedIn) {
        return <Navigate to='/' />
    }
    return <Component {...props} />
}

export { RequireAuth }

export const AuthRoutes = () => {
    let auth = { 'token': localStorage.getItem('myToken') }
    return (
        auth.token !== null ? <Outlet /> : <Navigate to='/' />
    )
}