import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'

export class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Email: localStorage.getItem("myUserName")
        }
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />

        return (
            <div>
                <div className="container border">
                    <h4 className="mt-2 mb-5">
                        <b>User Profile</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <label className="mt-1">{this.state.Email}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Email</label>
                            </div>
                            <label className="mt-1">{this.state.Email}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">    
                            </div>  
                            <Link to='/ChangePassword' className="mt-1">Change Password</Link>                          
                        </div>                    
                    </form>
                </div>
            </div>
        )
    }
}

export default UserProfile