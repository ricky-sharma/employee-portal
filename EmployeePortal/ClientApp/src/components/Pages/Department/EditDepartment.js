import React, { Component } from 'react';
import AlertMessage from '../../Core/AlertMessage';
import { WebApi } from '../../Helpers/WebApi.ts';
import { Container } from 'reactstrap';
import { Prompt, Redirect } from "react-router-dom";
import AlertDialog from '../../Core/AlertDialog';

export class EditDepartment extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Location: '',
            showAlert: false,
            alertType: '',
            message: '',
            readOnly: false,
            isBlocking: false
        }
        this.id = 0;
    }

    saveStateToLocalStorage() {
        const user = localStorage.getItem("myUserName")
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key + user, JSON.stringify(this.state[key]));
        }

        localStorage.setItem("id" + user, this.id);
    }

    hydrateStateWithLocalStorage() {
        const user = localStorage.getItem("myUserName")
        // for every item in React state
        this.setState({
            Name: JSON.parse(localStorage.getItem("Name" + user)), Location: JSON.parse(localStorage.getItem("Location" + user)),
            showAlert: JSON.parse(localStorage.getItem("showAlert" + user)), alertType: JSON.parse(localStorage.getItem("alertType" + user)),
            message: JSON.parse(localStorage.getItem("message" + user)), readOnly: JSON.parse(localStorage.getItem("readOnly" + user)),
            isBlocking: JSON.parse(localStorage.getItem("isBlocking" + user))
        });

        this.id = localStorage.getItem("id" + user)
    }

    componentDidMount = () => {
        const user = localStorage.getItem("myUserName")
        if (this.id !== 0 && !localStorage.getItem("id" + user)) {
            let url = `/api/Departments/` + this.id
            WebApi(url, '', 'GET')
                .then(response => {
                    this.setState({ Name: response.Name, Location: response.Location }
                        , () => this.saveStateToLocalStorage()
                    )
                });
        }
        else {
            this.hydrateStateWithLocalStorage();
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
                    if (response.Message && response.Message.toUpperCase() === "SUCCESS") {
                        this.setState({ readOnly: true, isBlocking: false })
                        AlertDialog('Department data saved successfully.')
                    }
                    else
                        AlertDialog('Some error occured, please try again.')
                });
        }
    }

    handleBack = () => {
        return this.props.history.push('/Departments')
    }

    handlePrompt = () => {
        return `Are you sure you want to do this action, any unsaved changes may be lost`
    }

    componentWillUnmount() {
        const user = localStorage.getItem("myUserName")
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.removeItem(key + user)
        }
        localStorage.removeItem("id" + user);
    }

    render() {
        const user = localStorage.getItem("myUserName")
        const { Name, Location, showAlert, alertType, message, readOnly } = this.state

        if (this.props.location && this.props.location.state)
            this.id = this.props.location.state

        if ((!this.id || this.id === 0) && !localStorage.getItem("id" + user)) {
            return <Redirect to='/Departments' />
        }

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
                <Prompt when={this.state.isBlocking} message={this.handlePrompt} />
                <Container className="border">
                    <h4 className="mt-2 mb-5">
                        <b>Edit - Department</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Department name</label>
                            </div>
                            <input value={Name} onChange={(e) => { this.setState({ Name: e.target.value, isBlocking: true }, () => this.saveStateToLocalStorage()) }} className={"mb-1 " + (readOnly === true ? "disabled-inputs" : "")} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Location</label>
                            </div>
                            <input value={Location} onChange={(e) => { this.setState({ Location: e.target.value, isBlocking: true }, () => this.saveStateToLocalStorage()) }} className={"mb-1 " + (readOnly === true ? "disabled-inputs" : "")} type="text"></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-4"></div>
                            <input className="btn btn-success mr-1" onClick={this.handleSubmit} type="button" value={(readOnly === true ? "Edit" : "Update")} />
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </Container>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default EditDepartment
