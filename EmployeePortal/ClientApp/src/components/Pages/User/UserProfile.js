import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import WebApi from '../../Helpers/WebApi';
import { Container } from 'reactstrap';

export class UserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserId: '',
            UserName: localStorage.getItem("myUserName"),
            Email: '',
            FirstName: '',
            LastName: '',
            Gender: '',
            DOB: '',
            Phone: '',            
        }
    }

    componentDidMount = () => {
        let url = `/api/Account/UserInfo`
        WebApi(url, '', 'GET')
            .then(response => {                
                if (response.UserId) {
                    this.setState({
                        UserId: response.UserId,
                        Email: response.Email,
                        Phone: response.Phone
                    }, () => {
                        url = `/api/AspNetUserInfoes/` + this.state.UserId
                        WebApi(url, '', 'GET')
                            .then(resp => {                                
                                if (resp.length && resp.length > 0) {                                    
                                    this.setState({
                                        FirstName: resp[0].FirstName,
                                        LastName: resp[0].LastName,
                                        Gender: resp[0].Gender,
                                        DOB: resp[0].DOB
                                    })
                                }
                            })
                    })
                }
            });
    }

    handleEditUser = () =>{
        this.props.history.push('/EditUserProfile')
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />
                    
        return (
            <div>
                <Container className="border">
                    <div className="row  p-2">
                        <h4 className="mt-2 mb-5 col-11">
                            <b>User Profile</b>
                        </h4>
                        <div className="col-1">
                        <button type="button" onClick={this.handleEditUser} className="btn btn-success add-new mt-1 float-rt">Edit</button>                            
                        </div>
                    </div>
                    <form>
                    <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <label className="mt-1">{this.state.UserName}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Name</label>
                            </div>
                            <label className="mt-1">
                                {this.state.FirstName} {this.state.LastName}
                            </label>
                        </div>                        
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Email</label>
                            </div>
                            <label className="mt-1">{this.state.Email}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Phone</label>
                            </div>
                            <label className="mt-1">{this.state.Phone}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Gender</label>
                            </div>
                            <label className="mt-1">{this.state.Gender}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Date of Birth</label>
                            </div>
                            <label className="mt-1">{this.state.DOB}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                            </div>
                            <Link to='/ChangePassword' className="mt-1">Change Password</Link>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default UserProfile