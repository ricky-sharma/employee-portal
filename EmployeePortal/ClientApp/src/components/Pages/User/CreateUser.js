import React, { Component } from 'react'
import WebApi from '../../Helpers/WebApi';
import { Container } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertMessage from '../../AlertMessage';
import moment from 'moment';
import "../../css/User.css";

export class CreateUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            NewUserName: '',
            Password: '',
            ConfirmPassword: '',
            Email: '',
            ConfirmEmail: '',
            FirstName: '',
            LastName: '',
            Gender: '',
            DOB: '',
            Phone: '',
            ConfirmPhone: '',
            ShowConfirmEmail: false,
            ShowConfirmPhone: false,
            ShowConfirmPassword: false,
            showAlert: false,
            alertType: '',
            message: '',
        }
    }

    handleChangeEmail = (e) => {
        this.setState({ Email: e.target.value }, () => {
            if (this.state.Email && this.state.Email !== this.prevEmail) {
                this.setState({ ShowConfirmEmail: true })
            }
            else {
                this.setState({ ShowConfirmEmail: false })
            }
        })
    }

    handleChangePhone = (e) => {
        this.setState({ Phone: e.target.value }, () => {
            if (this.state.Phone && this.state.Phone !== this.prevPhone) {
                this.setState({ ShowConfirmPhone: true })
            }
            else {
                this.setState({ ShowConfirmPhone: false })
            }
        })
    }

    handleChangePassword = (e) => {
        this.setState({ Password: e.target.value }, () => {
            if (this.state.Password && this.state.Password !== this.prevPassword) {
                this.setState({ ShowConfirmPassword: true })
            }
            else {
                this.setState({ ShowConfirmPassword: false })
            }
        })
    }

    handleChangeDOB = date => {
        this.setState({
            DOB: date
        }, () => {
        });
    };

    handleSubmit = () => {
        if (this.state.FirstName === '' || this.state.LastName === '' || this.state.Password === '' || this.state.Gender === 'select'
            || this.state.DOB === '' || this.state.Phone === '' || this.state.Email === '') {
            return this.setState({ showAlert: true, alertType: "danger" })
        }

        let userInforViewModel =
        {
            "UserId": 0,
            "UserName": this.state.NewUserName,
            "Email": this.state.Email,
            "Phone": this.state.Phone,
            "Password": this.state.Password
        }

        if (!this.state.ShowConfirmPassword) {
            userInforViewModel["ConfirmPassword"] = this.state.Password
        }
        else
            userInforViewModel["ConfirmPassword"] = this.state.ConfirmPassword

        if (!this.state.ShowConfirmEmail) {
            userInforViewModel["ConfirmEmail"] = this.state.Email
        }
        else
            userInforViewModel["ConfirmEmail"] = this.state.ConfirmEmail

        if (!this.state.ShowConfirmPhone) {
            userInforViewModel["ConfirmPhone"] = this.state.Phone
        }
        else
            userInforViewModel["ConfirmPhone"] = this.state.ConfirmPhone

        let url = `/api/Account/Register`
        let data = JSON.stringify(userInforViewModel)
        WebApi(url, data, 'POST')
            .then(response => {
                if (response) {
                    if (response.Message && response.Message === 'SUCCESS') {
                        url = `/api/AspNetUserInfoes`
                        data = JSON.stringify({
                            "Id": 0,
                            "FirstName": this.state.FirstName,
                            "LastName": this.state.LastName,
                            "Gender": this.state.Gender,
                            "DOB": this.state.DOB != null ? moment(this.state.DOB).format('DD-MMM-YYYY') : '',
                            "UsersId": 0,
                            "userInfoViewModel": userInforViewModel
                        })
                        WebApi(url, data, 'POST')
                            .then(response => {
                                if (response) {
                                    if (response.Message && response.Message === 'SUCCESS')
                                        this.props.history.push('/Users')
                                    else
                                        this.setState({
                                            showAlert: true, alertType: 'danger', message: response
                                        });
                                }
                            });
                    }
                    else
                        this.setState({
                            showAlert: true, alertType: 'danger', message: response
                        });
                }
            });
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        const GenderOptions = [<option key="1" value="Male">Male</option>,
        <option key="2" value="Female">Female</option>];

        const { NewUserName, Password, ConfirmPassword, Email, FirstName, LastName, Gender, DOB, Phone, ConfirmPhone, ConfirmEmail, showAlert, alertType, message } = this.state

        const SuccessMessage = "User Profile has been edited successfully."
        const ErrorMessage = "Please fill in all required fields."
        let Message
        if (alertType === "success")
            Message = SuccessMessage
        else if (alertType === "danger") {
            if (message !== '')
                Message = message
            else
                Message = ErrorMessage
        }

        return (
            <div>
                <Container className="border">
                    <h4 className="mt-2 mb-5">
                        <b>Create - User Profile</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <div className="col-4">
                                <input value={NewUserName} onChange={(e) => { this.setState({ NewUserName: e.target.value }) }} type="text"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Password</label>
                            </div>
                            <div className="col-4">
                                <input className="UserProfile" value={Password} onChange={(e) => this.handleChangePassword(e)} type="password"></input>
                            </div>
                        </div>
                        <div className={"row  p-2 " + (this.state.ShowConfirmPassword === true ? " " : "d-none")}>
                            <div className="col-4">
                                <label>Confirm Password</label>
                            </div>
                            <div className="col-4">
                                <input className="UserProfile" value={ConfirmPassword} onChange={(e) => { this.setState({ ConfirmPassword: e.target.value }) }} type="password"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>First Name</label>
                            </div>
                            <div className="col-4">
                                <input value={FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }} type="text"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Last Name</label>
                            </div>
                            <div className="col-4">
                                <input value={LastName} onChange={(e) => { this.setState({ LastName: e.target.value }) }} type="text"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Email</label>
                            </div>
                            <div className="col-4">
                                <input value={Email} onChange={(e) => this.handleChangeEmail(e)} type="text"></input>
                            </div>
                        </div>
                        <div className={"row  p-2 " + (this.state.ShowConfirmEmail === true ? " " : "d-none")}>
                            <div className="col-4">
                                <label>Confirm Email</label>
                            </div>
                            <div className="col-4">
                                <input value={ConfirmEmail} onChange={(e) => { this.setState({ ConfirmEmail: e.target.value }) }} type="text"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Phone</label>
                            </div>
                            <div className="col-4">
                                <input value={Phone} onChange={(e) => this.handleChangePhone(e)} type="text"></input>
                            </div>
                        </div>
                        <div className={"row  p-2 " + (this.state.ShowConfirmPhone === true ? " " : "d-none")}>
                            <div className="col-4">
                                <label>Confirm Phone</label>
                            </div>
                            <div className="col-4">
                                <input value={ConfirmPhone} onChange={(e) => { this.setState({ ConfirmPhone: e.target.value }) }} type="text"></input>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Gender</label>
                            </div>
                            <div className="col-4">
                                <select value={Gender} onChange={(e) => { this.setState({ Gender: e.target.value }) }}>
                                    <option key="0" value="select">Select</option>{GenderOptions}
                                </select>
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Date of Birth</label>
                            </div>
                            <div className="col-4">
                                <DatePicker placeholderText="dd/MM/yyyy" dateFormat="dd/MM/yyyy" selected={DOB} onChange={this.handleChangeDOB} />
                            </div>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                            </div>
                            <div className="col-4">
                                <input className="btn btn-success mr-1" value="Save" onClick={() => this.handleSubmit()} type="button"></input>
                                <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                            </div>
                        </div>
                    </form>

                </Container>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default CreateUser
