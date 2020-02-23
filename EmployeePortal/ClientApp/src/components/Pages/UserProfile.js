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
                <div className="row">
                    <h5>User Profile</h5>
                </div>
                <div className="col-4">
                    <div className="row">
                        <div>
                            <label style={{ marginRight: "38px" }} className="mt-1 mb-1">Username</label>
                        </div>
                        <div>
                            <label className="mt-1">{this.state.Email}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <label style={{ marginRight: "70px" }} className="mt-1 mb-1">Email</label>
                        </div>
                        <div>
                            <label className="mt-1">{this.state.Email}</label>
                        </div>
                    </div>
                    <div className="row"><Link to='/ChangePassword' activeClassName="active">Change Password</Link></div>
                </div>
            </div>
        )
    }
}

export default UserProfile