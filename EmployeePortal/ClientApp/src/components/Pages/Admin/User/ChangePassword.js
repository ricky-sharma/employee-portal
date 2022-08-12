import React, { Component } from 'react'
import { WebApi } from '../../../Helpers/WebApi.ts';
import ParseError from '../../../Helpers/ParseError';
import AlertMessage from '../../../Core/AlertMessage';

export class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            UserName: '',
            UserId: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            showAlert: false,
            alertType: '',
            message: ''
        }
        this.id = 0;
    }

    componentDidMount = () => {
        let url = this.id === 0 ? `/api/Account/UserInfo` : '/api/Account/UserInfo/' + this.id
        WebApi(url, '', 'GET')
            .then(response => {
                if (response.UserId) {
                    this.setState({
                        UserName: response.UserName ? response.UserName : "",
                        UserId: response.UserId ? response.UserId : "",
                    })
                }
            });
    }

    handleSubmit = () => {
        if (this.state.newPassword === '' || this.state.confirmPassword === '')
            return this.setState({ showAlert: true, alertType: "danger" })
        if (this.state.oldPassword === '' && this.id === 0)
            return this.setState({ showAlert: true, alertType: "danger" })
        let url = this.id === 0 ? `/api/Account/ChangePassword` : `/api/Account/ResetPassword`
        let dataObject = {
            "NewPassword": this.state.newPassword,
            "ConfirmPassword": this.state.confirmPassword
        }

        if (this.id === 0) {
            dataObject["OldPassword"] = this.state.oldPassword
        }
        else
            dataObject["UserId"] = this.state.UserId

        let data = JSON.stringify(dataObject)

        WebApi(url, data, 'POST')
            .then((response) => {
                if (response.Message && response.Message.toUpperCase() === "SUCCESS") {
                    return this.setState({ showAlert: true, alertType: 'success', })
                }
                else {
                    return this.setState({ showAlert: true, alertType: "danger", message: ParseError(response) })
                }
            });
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        let title = "Change Password"

        if (this.props.location && this.props.location.state)
            this.id = this.props.location.state

        if (this.id !== 0)
            title = "Reset Password"

        const { confirmPassword, newPassword, oldPassword, message, showAlert, alertType } = this.state
        const SuccessMessage = "Password has been changed successfully."
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
                <div className="border">
                    <h5 className="mt-2 mb-5"><b>{title}</b></h5>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Username</label>
                            </div>
                            <div className="col-4">
                                <label className="mt-1 ml-2">{this.state.UserName}</label>
                            </div>
                        </div>
                        <div className={"row p-2 " + (this.id === 0 ? "" : "d-none")}>
                            <div className="col-4">
                                <label>Old Password</label>
                            </div>
                            <div className="col-4">
                                <input value={oldPassword} onChange={(e) => this.setState({ oldPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-4">
                                <label>New Password</label>
                            </div>
                            <div className="col-4">
                                <input value={newPassword} onChange={(e) => this.setState({ newPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-4">
                                <label>Confirm New Password</label>
                            </div>
                            <div className="col-4">
                                <input value={confirmPassword} onChange={(e) => this.setState({ confirmPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input>
                            </div>
                        </div>
                        <div className="row p-2">
                            <div className="col-4"></div>
                            <div className="col-4">
                                <button className="btn btn-success mr-2" onClick={this.handleSubmit}>Submit</button>
                                <button className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack}>Back</button>
                            </div>
                        </div>
                    </form>
                </div>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default ChangePassword
