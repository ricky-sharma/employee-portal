import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import WebApi from '../../Helpers/WebApi';
import ParseError from '../../Helpers/ParseError';
import AlertMessage from '../../AlertMessage';

export class ChangePassword extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('myToken') || '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            showAlert: false,
            alertType: '',
            message: ''
        }
    }

    handleSubmit = () => {
        if (this.state.oldPassword === '' || this.state.newPassword === '' || this.state.confirmPassword === '')
            return this.setState({ showAlert: true, alertType: "danger" })
        let url = `/api/Account/ChangePassword`
        let data = JSON.stringify({
            "OldPassword": this.state.oldPassword,
            "NewPassword": this.state.newPassword,
            "ConfirmPassword": this.state.confirmPassword
        })
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
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />
        const { confirmPassword, newPassword, oldPassword, message, showAlert, alertType } = this.state
        const SuccessMessage = "Password has been changed successfully."
        const ErrorMessage = "OldPassword, NewPassword and ConfirmPassword fields cannot be empty."
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
                <div className="container border">
                    <h5 className="mt-2 mb-5"><b>Change Password</b></h5>
                    <form>
                        <div className="row p-2"><div className="col-4"><label>Old Password</label></div><input value={oldPassword}
                            onChange={(e) => this.setState({ oldPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input></div>
                        <div className="row p-2"><div className="col-4"><label>New Password</label></div><input value={newPassword}
                            onChange={(e) => this.setState({ newPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input></div>
                        <div className="row p-2"><div className="col-4"><label>Confirm New Password</label></div><input value={confirmPassword}
                            onChange={(e) => this.setState({ confirmPassword: e.target.value, alertType: '', showAlert: false })} type="password"></input></div>
                        <div className="row p-2"><div className="col-4"></div><input className="btn btn-success mr-2" value="Submit" onClick={this.handleSubmit} type="button"></input>
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" /></div>
                    </form>
                </div>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default ChangePassword
