import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AlertMessage from '../AlertMessage';

export class AddDepartment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Location: '',
            token: localStorage.getItem('myToken') || '',
            showAlert: false,
            alertType: '',
        }
    }

    handleSubmit = () => {
        if (this.state.Name === '' || this.state.Location === '') {
            return this.setState({ showAlert: true, alertType: "danger" })
        }

        fetch('http://employee.service.com/api/Departments', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + this.state.token
            },
            body: JSON.stringify({
                "ID": 0,
                "Name": this.state.Name,
                "Location": this.state.Location
            })

        }).then(res => {
            if (res.ok) {
                this.setState({ showAlert: true, alertType: 'success', Name: '', Location: '' })
            } else {
                throw Error(res.statusText);
            }
        }).catch(error => console.error(error));
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        const { Name, Location, showAlert, alertType } = this.state
        const isLoggedIn = localStorage.getItem("myToken");

        if (!isLoggedIn)
            return <Redirect to='/' />
        const SuccessMessage = "Department has been added successfully."
        const ErrorMessage = "Name and Location fields cannot be empty."
        let Message
        if (alertType === "success")
            Message = SuccessMessage
        else if (alertType === "danger")
            Message = ErrorMessage

        return (
            <div>
                <div className="container border">
                    <h4 className="mt-2 mb-5">
                        <b>Add Department</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Department name</label>
                            </div>
                            <input value={Name} onChange={(e) => { this.setState({ Name: e.target.value, successAlert: false, errorAlert: false }) }} className="mt-1" type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Location</label>
                            </div>
                            <input value={Location} onChange={(e) => { this.setState({ Location: e.target.value, successAlert: false, errorAlert: false }) }} className="mt-1" type="text"></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-4"></div>
                            <input className="btn btn-success mr-1" onClick={this.handleSubmit} type="button" value="Submit" />
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </div>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default AddDepartment
