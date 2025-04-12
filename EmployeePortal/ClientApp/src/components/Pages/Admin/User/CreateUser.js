import { createBrowserHistory } from 'history';
import moment from 'moment';
import React, { Component, createRef } from 'react';
import { Container } from 'reactstrap';
import AlertMessage from '../../../Core/AlertMessage';
import Input from '../../../Core/Input';
import "../../../css/User.css";
import { WebApi } from '../../../Helpers/WebApi.ts';

const history = createBrowserHistory();

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
        this.dateRef = createRef(null)
    }

    handleChangeEmail = (e) => {
        this.setState({ Email: e.target.value }, () => {
            if (this.state.Email && this.state.Email !== '') {
                this.setState({ ShowConfirmEmail: true })
            }
            else {
                this.setState({ ShowConfirmEmail: false })
            }
        })
    }

    handleChangePhone = (e) => {
        this.setState({ Phone: e.target.value }, () => {
            if (this.state.Phone && this.state.Phone !== '') {
                this.setState({ ShowConfirmPhone: true })
            }
            else {
                this.setState({ ShowConfirmPhone: false })
            }
        })
    }

    handleChangePassword = (e) => {
        this.setState({ Password: e.target.value }, () => {
            if (this.state.Password && this.state.Password !== '') {
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

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.FirstName === '' || this.state.LastName === '' || this.state.Password === '' || this.state.Gender === 'select'
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
                                    if (response.Message && response.Message === 'SUCCESS') {
                                        history.push('/Users')
                                        history.go(0)
                                    }
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
        return history.back()
    }

    render() {
        const GenderOptions = [{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]

        const { NewUserName, Password, ConfirmPassword, Email, FirstName, LastName, Gender, DOB, Phone,
            ConfirmPhone, ConfirmEmail, showAlert, alertType, message, ShowConfirmEmail, ShowConfirmPhone } = this.state

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
                <Container className="border pb-2">
                    <form onSubmit={this.handleSubmit}>
                        <div className="table-title">
                            <div className="row nowrap m-0 p-4">
                                <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">Create<b> User</b></h2></div>
                                <div className="col-sm-6 m-0 p-0">
                                    <button type="submit" className="btn btn-success add-new p-0 m-0 my-1 ml-1">Save</button>
                                    <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white p-0 m-0 my-1">Back</button>
                                </div>
                            </div>
                        </div>
                        <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
                        <div className="row  p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Username" value={NewUserName} onChange={(e) => {
                                    this.setState({
                                        NewUserName: e.target.value
                                    })
                                }}
                                    onClear={(value) => {
                                        this.setState({
                                            NewUserName: value
                                        })
                                    }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Password" value={Password}
                                    onChange={(e) => this.handleChangePassword(e)}
                                    onClear={(value) => {
                                        this.setState({
                                            Password: value
                                        })
                                    }} required={true} dataType="password" />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Confirm Password" value={ConfirmPassword}
                                    onChange={(e) => {
                                        this.setState({
                                            ConfirmPassword: e.target.value
                                        })
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            ConfirmPassword: value
                                        })
                                    }} required={true} dataType="password" />
                            </div>
                        </div>
                        <div className="row  p-4">
                            <div className="col-12 alignCenter">
                                <Input label="First Name" value={FirstName} onChange={(e) => {
                                    this.setState({
                                        FirstName: e.target.value
                                    })
                                }}
                                    onClear={(value) => {
                                        this.setState({
                                            FirstName: value
                                        })
                                    }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Last Name" value={LastName} onChange={(e) => {
                                    this.setState({
                                        LastName: e.target.value
                                    })
                                }}
                                    onClear={(value) => {
                                        this.setState({
                                            LastName: value
                                        })
                                    }} required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input type="select" label="Gender" value={Gender} options={GenderOptions}
                                    onChange={(e) => {
                                        this.setState({
                                            Gender: e.target.value
                                        })
                                    }} required={true} />
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
                                    onClear={(value) => {
                                        this.setState({
                                            Email: value
                                        })
                                    }} required={true} />
                            </div>
                        </div>
                        <div className={"row p-4 " + (ShowConfirmEmail === true ? " " : "d-none")}>
                            <div className="col-12 alignCenter">
                                <Input label="Confirm Email" dataType="email" value={ConfirmEmail}
                                    onChange={(e) => {
                                        this.setState({
                                            ConfirmEmail: e.target.value
                                        })
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            ConfirmEmail: value
                                        })
                                    }}
                                    required={true} />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Phone" dataType="number" value={Phone}
                                    onChange={(e) => this.handleChangePhone(e)}
                                    onClear={(value) => {
                                        this.setState({
                                            Phone: value
                                        })
                                    }} required={true} />
                            </div>
                        </div>
                        <div className={"row p-4 " + (ShowConfirmPhone === true ? " " : "d-none")}>
                            <div className="col-12 alignCenter">
                                <Input label="Confirm Phone" dataType="number" value={ConfirmPhone}
                                    onChange={(e) => {
                                        this.setState({
                                            ConfirmPhone: e.target.value
                                        })
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            ConfirmPhone: value
                                        })
                                    }}
                                    required={true} />
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default CreateUser
