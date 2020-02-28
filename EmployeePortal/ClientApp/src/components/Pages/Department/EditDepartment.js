import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AlertMessage from '../../AlertMessage';
import WebApi from '../../Helpers/WebApi';

export class EditDepartment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Location: '',
            showAlert: false,
            alertType: '',
            message: '',
            readOnly: false
        }
        this.id = 0;
    }

    componentDidMount = () => {
        if (this.id !== 0) {
            let url = `/api/Departments/` + this.id
            WebApi(url, '', 'GET')
                .then(response => {
                    this.setState({ Name: response.Name, Location: response.Location })
                });
        }
    }

    handleSubmit = () => {
        if (this.state.readOnly) {
            this.setState({ readOnly: false, showAlert: false, alertType: "" })
        }
        else {
            if (this.state.Name === '' || this.state.Location === '') {
                return this.setState({ showAlert: true, alertType: "danger" })
            }
            let url = `/api/Departments/` + this.id
            let data = JSON.stringify({
                "ID": this.id,
                "Name": this.state.Name,
                "Location": this.state.Location
            })
            WebApi(url, data, 'PUT')
                .then(response => {
                    if (response.Message && response.Message.toUpperCase() === "SUCCESS")
                        this.setState({ showAlert: true, alertType: 'success', readOnly: true })
                    else
                        return this.setState({ showAlert: true, alertType: "danger", message: "Some error occured, please try again." })
                });
        }
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        const { Name, Location, showAlert, alertType, message, readOnly } = this.state
        const IsLoggedIn = localStorage.getItem("myToken");
        if (!IsLoggedIn)
            return <Redirect to='/' />

        if (this.props.location && this.props.location.data && this.props.location.data.ID)
            this.id = this.props.location.data.ID

        const SuccessMessage = "Department has been edited successfully."
        const ErrorMessage = "Name and Location fields cannot be empty."
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
                    <h4 className="mt-2 mb-5">
                        <b>Edit Department</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Department name</label>
                            </div>
                            <input value={Name} onChange={(e) => { this.setState({ Name: e.target.value }) }} className={"mb-1 " + (readOnly === true ? "disabled-inputs" : "")} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Location</label>
                            </div>
                            <input value={Location} onChange={(e) => { this.setState({ Location: e.target.value }) }} className={"mb-1 " + (readOnly === true ? "disabled-inputs" : "")} type="text"></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-4"></div>
                            <input className="btn btn-success mr-1" onClick={this.handleSubmit} type="button" value={(readOnly === true ? "Edit" : "Update")} />
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </div>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default EditDepartment
