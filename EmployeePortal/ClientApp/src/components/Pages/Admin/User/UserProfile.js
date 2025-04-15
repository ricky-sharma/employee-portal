import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import Input from '../../../Core/Input';
import SideBar from '../../../Core/SideBar';
import GetUserInfo from '../../../Helpers/GetUserInfo';
import { mapDispatchToProps, mapStateToProps } from './../../../../redux/reducers/userSlice';

class UserProfileComponent extends Component {
    constructor(props) {
        super(props)
        const { username } = props
        this.state = {
            UserId: '',
            UserName: username,
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
        this.props.navigate('/EditUser')
    }

    render() {
        return (
            <div className="row">
                <div className="col-2 padding-left-0 padding-right-5">
                    <SideBar menuItems={this.menuItems}></SideBar>
                </div>
                <div className="col-8 mb-5">
                    <Container fluid className="border">
                        <div>
                            <div className="table-title">
                                <div className="row nowrap m-0 p-4">
                                    <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">
                                        User<b> Profile</b></h2></div>
                                    <div className="col-sm-6 m-0 p-0">
                                        <button type="button" onClick={this.handleEditUser} className="btn btn-success add-new p-0 m-0 my-1 ml-1">Edit</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Username" value={this.state.UserName} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Name" value={`${this.state.FirstName} ${this.state.LastName}`} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Gender" value={this.state.Gender} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Date of Birth" value={this.state.DOB} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Email" value={this.state.Email} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                            <div className="row p-4">
                                <div className="col-12 alignCenter">
                                    <Input label="Phone" value={this.state.Phone} disabled={true} className="fontStyle" />
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        )
    }
}

export const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent)