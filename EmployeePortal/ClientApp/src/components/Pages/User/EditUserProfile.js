import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import WebApi from '../../Helpers/WebApi';
import { Container } from 'reactstrap';

export class EditUserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserId: '',
            UserName: localStorage.getItem("myUserName"),
            Email: '',
            ConfirmEmail: '',
            FirstName: '',
            LastName: '',
            Gender: '',
            DOB: '',
            Phone: '',
            ConfirmPhone: '',
            ShowConfirmEmail: false,
            ShowConfirmPhone: false
        }

        this.prevEmail = ''
        this.prevPhone = ''
    }

    componentDidMount = () => {
        let url = `/api/Account/UserInfo`
        WebApi(url, '', 'GET')
            .then(response => {
                console.log(response)
                if (response.UserId) {
                    this.setState({
                        UserId: response.UserId ? response.UserId : "",
                        Email: response.Email ? response.Email : "",
                        Phone: response.Phone ? response.Phone : ""
                    }, () => {
                        url = `/api/AspNetUserInfoes/` + this.state.UserId
                        WebApi(url, '', 'GET')
                            .then(response => {
                                this.prevEmail = this.state.Email
                                this.prevPhone = this.state.Phone
                                console.log(response)
                                if (response.length && response.length > 0) {
                                    this.setState({
                                        FirstName: response.FirstName,
                                        LastName: response.LastName,
                                        Gender: response.Gender,
                                        DOB: response.DOB
                                    })

                                }
                            })
                    })
                }
            });
    }

    handleChangeEmail = (e) => {
        this.setState({ Email: e.target.value }, () => {
            if (this.state.Email !== this.prevEmail) {
                this.setState({ ShowConfirmEmail: true })
            }
            else {
                this.setState({ ShowConfirmEmail: false })
            }
        })
    }

    handleChangePhone = (e) => {
        this.setState({ Phone: e.target.value }, () => {
            if (this.state.Phone !== this.prevPhone) {
                this.setState({ ShowConfirmPhone: true })
            }
            else {
                this.setState({ ShowConfirmPhone: false })
            }
        })
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />

        const GenderOptions = [<option key="1" value="Male">Male</option>,
        <option key="2" value="Female">Female</option>];

        const { Email, FirstName, LastName, Gender, DOB, Phone, ConfirmPhone, ConfirmEmail } = this.state

        return (
            <div>
                <Container className="border">

                    <h4 className="mt-2 mb-5">
                        <b>Edit - User Profile</b>
                    </h4>

                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <label className="mt-1">{this.state.UserName}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>First Name</label>
                            </div>
                            <input value={FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Last Name</label>
                            </div>
                            <input value={LastName} onChange={(e) => { this.setState({ LastName: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Email</label>
                            </div>
                            <input value={Email} onChange={(e) => this.handleChangeEmail(e)} type="text"></input>
                        </div>
                        <div className={"row  p-2 " + (this.state.ShowConfirmEmail === true ? " " : "d-none")}>
                            <div className="col-4">
                                <label>Confirm Email</label>
                            </div>
                            <input value={ConfirmEmail} onChange={(e) => { this.setState({ ConfirmEmail: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Phone</label>
                            </div>
                            <input value={Phone} onChange={(e) => this.handleChangePhone(e)} type="text"></input>
                        </div>
                        <div className={"row  p-2 " + (this.state.ShowConfirmPhone === true ? " " : "d-none")}>
                            <div className="col-4">
                                <label>Confirm Phone</label>
                            </div>
                            <input value={ConfirmPhone} onChange={(e) => { this.setState({ ConfirmPhone: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Gender</label>
                            </div>
                            <select value={Gender} onChange={(e) => { this.setState({ Gender: e.target.value }) }}>
                                <option key="0" value="select">Select</option>{GenderOptions}
                            </select>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Date of Birth</label>
                            </div>
                            <input value={DOB} onChange={(e) => { this.setState({ DOB: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                            </div>
                            <input className="btn btn-success mr-1" value="Save" onClick={() => this.handleSubmit()} type="button"></input>
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default EditUserProfile
