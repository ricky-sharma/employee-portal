import React from 'react'
import { Redirect } from 'react-router-dom';

const RequireAuth = (Component) => (props) => {
    const IsLoggedIn = localStorage.getItem('myToken');
    if (!IsLoggedIn) {
        return <Redirect to='/' />
    }
    return <Component {...props} />
}

export { RequireAuth }