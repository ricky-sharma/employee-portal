import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Alert } from 'reactstrap';

export class ChangePassword extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            token: localStorage.getItem('myToken') || '',
             OldPassword:'',
             NewPassword:'',
             ConfirmPassword:'',
             successAlert: false,
             errorAlert: false
        }
    }

    handleSubmit =() =>{
        if (this.state.OldPassword === '' || this.state.NewPassword === '' || this.state.ConfirmPassword === '') {
            
            return this.setState({ errorAlert: true }, () => { console.log(this.state.errorAlert); console.log(this.state.successAlert)})
        }
        fetch('http://employee.service.com/api/Account/ChangePassword', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                "OldPassword": this.state.OldPassword,
                "NewPassword": this.state.NewPassword,
                "ConfirmPassword": this.state.ConfirmPassword
            })

        }).then(res => {
            if (res.ok) {
                this.setState({ successAlert: true })
            } else {
                throw Error(res.statusText);
            }
        }).catch(error => console.error(error));
    }

    handleBack = () => {
        return this.props.history.goBack()
    }
    
    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />
        
        let alertUI;
            if (this.state.successAlert)
            alertUI = <div className="col-sm-5 col-5 col-md-5 col-lg-8" style={{ marginTop: "75px" }}> <Alert style={{opacity:"100%"}} color="success"> Password has been changed successfully. </Alert></div>
        if (this.state.errorAlert)
            alertUI = <div className="col-sm-5 col-5 col-md-5 col-lg-8" style={{ marginTop: "75px" }}> <Alert style={{ opacity: "100%" }} color="danger"> OldPassword, NewPassword and ConfirmPassword fields cannot be empty. </Alert></div>

        return (
            <div>
            <div className="container border">
                <h5 className="mt-2 mb-5"><b>Change Password</b></h5>

                <div className="row p-2"><div className="col-4"><label>Old Password</label></div><input value={this.state.OldPassword}
                onChange={(e) => this.setState({OldPassword:e.target.value, successAlert: false, errorAlert: false })} type="password"></input></div>
                <div className="row p-2"><div className="col-4"><label>New Password</label></div><input value={this.state.NewPassword} 
                onChange={(e) => this.setState({NewPassword:e.target.value , successAlert: false, errorAlert: false })}  type="password"></input></div>
                <div className="row p-2"><div className="col-4"><label>Confirm New Password</label></div><input value={this.state.ConfirmPassword} 
                onChange={(e) => this.setState({ConfirmPassword:e.target.value , successAlert: false, errorAlert: false })}  type="password"></input></div>
                <div className="row p-2"><div className="col-4"></div><input className="btn btn-success mr-2" value="Submit" onClick={this.handleSubmit} type="button"></input>
                <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back"/></div>
            </div>
            {alertUI}
            </div>
        )
    }
}

export default ChangePassword
