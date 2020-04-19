import React from 'react'
import { Redirect } from 'react-router-dom';

const RequireAuth = (Component) => { 

    return class App extends Component { 
        render() { 
            const IsLoggedIn = localStorage.getItem('myToken'); 
            if(!IsLoggedIn) { 
                return <Redirect to='/' />
            } 
            
           return <Component {...this.props} /> 
        }
    } 

} 

export { RequireAuth }