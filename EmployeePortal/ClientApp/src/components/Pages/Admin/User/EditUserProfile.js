import { createBrowserHistory } from 'history';
import moment from 'moment';
import React, { Component, createRef } from 'react';
import { Container } from 'reactstrap';
import AlertMessage from '../../../Core/AlertMessage';
import Input from '../../../Core/Input';
import AlertDialog from '../../../Core/ModalDialogs';
import GetUserInfo from '../../../Helpers/GetUserInfo';
import { WebApi } from '../../../Helpers/WebApi.ts';

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
        this.dateRef = createRef(null)
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
                        ConfirmEmail: response.Email ? response.Email : "",
                        Phone: response.Phone ? response.Phone : "",
                        ConfirmPhone: response.Phone ? response.Phone : "",
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
                this.setState({ ShowConfirmEmail: true, ConfirmEmail: '' }, () => { })
            }
            else {
                this.setState({ ShowConfirmEmail: false, ConfirmEmail: this.prevEmail }, () => { })
            }
        })
    }

    handleChangePhone = (e) => {
        this.setState({ Phone: e.target.value }, () => {
            if (this.state.Phone && this.state.Phone !== this.prevPhone) {
                this.setState({ ShowConfirmPhone: true, ConfirmPhone: '' }, () => { })
            }
            else {
                this.setState({ ShowConfirmPhone: false, ConfirmPhone: this.prevPhone }, () => { })
            }
        })
    }

    handleChangeDOB = date => {
        this.setState({
            DOB: date
        }, () => {
        });
    };

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.FirstName === '' || this.state.LastName === '' || this.state.Gender === 'select'
            || this.state.DOB === '' || this.state.Phone === '' || this.state.Email === ''
            || this.dateRef?.current?.value === 'DD/MM/YYYY') {
            this.setState({ showAlert: true, alertType: "danger" })
            return false;
        }

        if (this.state.Phone !== '' && this.state.Phone !== this.state.ConfirmPhone) {
            this.setState({
                showAlert: true, alertType: "danger",
                message: 'Phone and Confirm Phone fields should be same, please provide valid input!'
            })
            return false;
        }

        if (this.state.Email !== '' && this.state.Email !== this.state.ConfirmEmail) {
            this.setState({
                showAlert: true, alertType: "danger",
                message: 'Email and Confirm Email fields should be same, please provide valid input!'
            })
            return false;
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
        const GenderOptions = [{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]

        if (history.location && history.location.state)
            this.id = history.location.state

        const { Email, FirstName, LastName, Gender, DOB, Phone, ConfirmPhone, ConfirmEmail, showAlert, alertType, message, UserName,
            ShowConfirmPhone, ShowConfirmEmail } = this.state

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
            <div className="mb-5">
                <Container className="border">
                    <form onSubmit={this.handleSubmit}>
                        <div className="table-title">
                            <div className="row nowrap m-0 p-4">
                                <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">Edit<b> User</b></h2></div>
                                <div className="col-sm-6 m-0 p-0">
                                    <button type="submit" className="btn btn-success add-new p-0 m-0 my-1 ml-1">Save</button>
                                    <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white p-0 m-0 my-1">Back</button>
                                </div>
                            </div>
                        </div>
                        <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Username" value={UserName} disabled={true} />
                            </div>
                        </div>
                        <div className="row  p-4">
                            <div className="col-12 alignCenter">
                                <Input label="First Name" value={FirstName} onChange={(e) => { this.setState({ FirstName: e.target.value }) }}
                                    onClear={(value) => { this.setState({ FirstName: value }) }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Last Name" value={LastName} onChange={(e) => { this.setState({ LastName: e.target.value }) }}
                                    onClear={(value) => { this.setState({ LastName: value }) }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input type="select" label="Gender" value={Gender} options={GenderOptions}
                                    onChange={(e) => { this.setState({ Gender: e.target.value }) }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label='Date of Birth' type="date" disableFuture={true} value={DOB}
                                    onChange={this.handleChangeDOB} customClass="customDate" required={true}
                                    inputRef={this.dateRef} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Email" dataType="email" value={Email}
                                    onChange={(e) => this.handleChangeEmail(e)}
                                    onClear={(value) => { this.setState({ Email: value }) }} required={true} />
                            </div>
                        </div>
                        <div className={"row p-4 " + (ShowConfirmEmail === true ? " " : "d-none")}>
                            <div className="col-12 alignCenter">
                                <Input label="Confirm Email" dataType="email" value={ConfirmEmail}
                                    onChange={(e) => { this.setState({ ConfirmEmail: e.target.value }) }}
                                    onClear={(value) => { this.setState({ ConfirmEmail: value }) }}
                                    required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Phone" dataType="number" value={Phone}
                                    onChange={(e) => this.handleChangePhone(e)}
                                    onClear={(value) => { this.setState({ Phone: value }) }} required={true} />
                            </div>
                        </div>
                        <div className={"row p-4 " + (ShowConfirmPhone === true ? " " : "d-none")}>
                            <div className="col-12 alignCenter">
                                <Input label="Confirm Phone" dataType="number" value={ConfirmPhone}
                                    onChange={(e) => { this.setState({ ConfirmPhone: e.target.value }) }}
                                    onClear={(value) => { this.setState({ ConfirmPhone: value }) }}
                                    required={true} />
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default EditUserProfile
