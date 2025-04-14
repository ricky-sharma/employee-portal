import React, { Component } from 'react';
import { Container } from 'reactstrap';
import AlertMessage from '../../../Core/AlertMessage';
import Input from '../../../Core/Input';
import ParseError from '../../../Helpers/ParseError';
import { WebApi } from '../../../Helpers/WebApi.ts';

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
                if (response?.UserId) {
                    this.setState({
                        UserName: response?.UserName ? response.UserName : "",
                        UserId: response.UserId ? response.UserId : "",
                    }, () => {
                    })
                }
            });
    }

    handleSubmit = (e) => {
        e.preventDefault()
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
                if (response?.Message && response.Message.toUpperCase() === "SUCCESS") {
                    return this.setState({ showAlert: true, alertType: 'success', })
                }
                else {
                    return this.setState({ showAlert: true, alertType: "danger", message: ParseError(response) })
                }
            });
    }

    handleBack = () => {
        this.props.navigate(-1)
    }

    render() {
        const { location } = this.props;
        if (location && location.state)
            this.id = location.state

        const { confirmPassword, newPassword, oldPassword, message, showAlert, alertType, UserName } = this.state
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
            <div className="mb-5">
                <Container className="border">
                    <form onSubmit={this.handleSubmit}>
                        <div className="table-title">
                            <div className="row nowrap m-0 p-4">
                                <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">
                                    {this.id !== 0 ? 'Reset' : 'Change'}<b> Password</b></h2></div>
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
                        {(this.id === 0 ? <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Old Password" value={oldPassword}
                                    onChange={(e) => this.setState({
                                        oldPassword: e.target.value,
                                        alertType: '',
                                        showAlert: false
                                    })}
                                    onClear={(value) => {
                                        this.setState({
                                            oldPassword: value
                                        })
                                    }} required={true} dataType="password" />
                            </div>
                        </div> : '')}
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="New Password" value={newPassword}
                                    onChange={(e) => this.setState({
                                        newPassword: e.target.value,
                                        alertType: '',
                                        showAlert: false
                                    })}
                                    onClear={(value) => {
                                        this.setState({
                                            newPassword: value
                                        })
                                    }} required={true} dataType="password" />
                            </div>
                        </div>
                        <div className="row p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Confirm New Password" value={confirmPassword}
                                    onChange={(e) => this.setState({
                                        confirmPassword: e.target.value,
                                        alertType: '',
                                        showAlert: false
                                    })}
                                    onClear={(value) => {
                                        this.setState({
                                            confirmPassword: value
                                        })
                                    }} required={true} dataType="password" />
                            </div>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default ChangePassword
