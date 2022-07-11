import React, { Component } from 'react'
import GetUserInfo from '../../../Helpers/GetUserInfo';
import { Container } from 'reactstrap';
import moment from 'moment';
import SideBar from '../../../SideBar';

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

    menuItems = [
        {
            id: 1,
            label: 'Change Password',
            link: '/ChangePassword'
        }];

    componentDidMount = () => {
        GetUserInfo(0)
            .then(response => {
                if (response) {
                    this.setState({
                        UserId: response.UserId ? response.UserId : "",
                        Email: response.Email ? response.Email : "",
                        Phone: response.Phone ? response.Phone : "",
                        FirstName: response.FirstName,
                        LastName: response.LastName,
                        Gender: response.Gender,
                        DOB: response.DOB !== null ? moment(response.DOB).format('DD-MMM-YYYY') : ''
                    })
                }
            })
    }

    handleEditUser = () => {
        this.props.history.push('/EditUserProfile')
    }

    render() {
        return (
            <div className="row">
                <div className="col-2 padding-left-0 padding-right-5">
                    <SideBar menuItems={this.menuItems}></SideBar>
                </div>
                <div className="col-8">

                    <Container fluid className="border">

                        <div className="row  p-2 nowrap">
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
                                {/* <Link to='/ChangePassword' className="mt-1">Change Password</Link> */}
                            </div>
                        </form>
                    </Container>
                </div>
            </div>
        )
    }
}

export default UserProfile