import React, { Component } from 'react'
import { WebApi } from '../../../Helpers/WebApi.ts';
import GetUserInfo from '../../../Helpers/GetUserInfo';
import { Container } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AlertMessage from '../../../Core/AlertMessage';
import AlertDialog from '../../../Core/ModalDialogs';
import moment from 'moment';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export class EditUserProfile extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserId: '',
            Id: '',
            UserName: '',
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
            showAlert: false,
            alertType: '',
            message: '',
        }

        this.prevEmail = ''
        this.prevPhone = ''
        this.id = 0;
    }

    componentDidMount = () => {
        GetUserInfo(this.id)
            .then(response => {
                if (response) {
                    this.setState({
                        UserName: response.UserName ? response.UserName : "",
                        UserId: response.UserId ? response.UserId : "",
                        Email: response.Email ? response.Email : "",
                        Phone: response.Phone ? response.Phone : "",
                        Id: response.Id,
                        FirstName: response.FirstName,
                        LastName: response.LastName,
                        Gender: response.Gender,
                        DOB: response.DOB !== null ? new Date(response.DOB) : ''
                    }, () => {
                        this.prevEmail = this.state.Email
                        this.prevPhone = this.state.Phone
                    })
                }
            })
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

    handleChangeDOB = date => {
        this.setState({
            DOB: date
        }, () => {
        });
    };

    handleSubmit = () => {
        if (this.state.FirstName === '' || this.state.LastName === '' || this.state.Gender === 'select'
            || this.state.DOB === '' || this.state.Phone === '' || this.state.Email === '') {
            return this.setState({ showAlert: true, alertType: "danger" })
        }

        let userInforViewModel =
        {
            "UserId": this.state.UserId,
            "UserName": this.state.UserName,
            "Email": this.state.Email,
            "Phone": this.state.Phone

        }
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

        let url = `/api/AspNetUserInfoes/` + this.state.UserId
        let data = JSON.stringify({
            "Id": this.state.Id,
            "FirstName": this.state.FirstName,
            "LastName": this.state.LastName,
            "Gender": this.state.Gender,
            "DOB": this.state.DOB != null ? moment(this.state.DOB).format('DD-MMM-YYYY') : '',
            "UserId": this.state.UserId,
            "userInfoViewModel": userInforViewModel
        })
        WebApi(url, data, 'PUT')
            .then(response => {
                if (response) {
                    if (response.Message && response.Message === 'SUCCESS') {
                        localStorage.setItem('myFullUserName', (this.state.FirstName + ' ' + this.state.LastName) ?? null)
                        AlertDialog('User data saved successfully.')
                        return true
                    }
                    else {
                        AlertDialog('Error while saving user data, please try again.')
                        return false
                    }
                }
            })
            .then(response => {
                if (response === true)
                    return history.back()
            });
    }

    handleBack = () => {
        return history.back()
    }

    render() {
        const GenderOptions = [<option key="1" value="Male">Male</option>,
        <option key="2" value="Female">Female</option>];

        if (history.location && history.location.state)
            this.id = history.location.state

        const { Email, FirstName, LastName, Gender, DOB, Phone, ConfirmPhone, ConfirmEmail, showAlert, alertType, message } = this.state

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
                        <b>Edit - User Profile</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <div className="col-4"> <label className="mt-1 ml-2">{this.state.UserName}</label></div>
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
                                <button className="btn btn-success mr-1" onClick={() => this.handleSubmit()} type="button">Save</button>
                                <button className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button">Back</button>
                            </div>
                        </div>
                    </form>
                </Container>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default EditUserProfile
