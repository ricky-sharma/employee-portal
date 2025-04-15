import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { store } from './../../redux/store';

const RequireAuth = (Component) => (props) => {
    const IsLoggedIn = !store?.getState()?.loggedOut;
    if (!IsLoggedIn) {
        return <Navigate to='/' />
    }
    return <Component {...props} />
}

export { RequireAuth };

export const AuthRoutes = () => {
    let auth = { 'loggedOut': useSelector(state => state.loggedOut) }
    return (
        auth.loggedOut !== true ? <Outlet /> : <Navigate to='/' />
    )
}