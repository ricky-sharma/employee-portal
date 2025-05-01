import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { Container } from 'reactstrap';
import AlertMessage from '../../Core/AlertMessage';
import AlertDialog from '../../Core/ModalDialogs';
import { WebApi } from '../../helpers/WebApi.ts';
import { mapDispatchToProps, mapStateToProps } from './../../../redux/reducers/userSlice';
import Input from './../../Core/Input';
import Address from '../../Core/addressComponents/Address';

class EditDepartmentComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Name: '',
            Location: '',
            showAlert: false,
            alertType: '',
            message: '',
            readOnly: false,
            isBlocking: false,
            backClicked: false,
            postalAddressReadOnly: false,
            sameResidentialAddress: false
        }
        this.id = 0;
    }

    saveStateToLocalStorage() {
        const user = this.props?.username
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key + user, JSON.stringify(this.state[key]));
        }

        localStorage.setItem("id" + user, this.id);
    }

    hydrateStateWithLocalStorage() {
        const user = this.props?.username
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
        const user = this.props?.username
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
        this.setState({ backClicked: true })
    }

    handlePrompt = () => {
        return `Are you sure you want to do this action, any unsaved changes may be lost`
    }

    componentWillUnmount() {
        const user = this.props?.username
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.removeItem(key + user)
        }
        localStorage.removeItem("id" + user);
    }

    render() {
        if (this.state.backClicked) {
            return <Navigate to='/Departments' />
        }
        const user = this.props?.username
        const { Name, Location, showAlert, alertType, message, readOnly, postalAddressReadOnly, sameResidentialAddress } = this.state
        const { location } = this.props;
        if (location && location.state)
            this.id = location.state

        if ((!this.id || this.id === 0) && !localStorage.getItem("id" + user)) {
            return <Navigate to='/Departments' />
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
            <div className="mb-5">
                <Container className="border">
                    <form onSubmit={this.handleSubmit}>
                        <div className="table-title">
                            <div className="row nowrap m-0 p-4">
                                <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">Edit<b> Department</b></h2></div>
                                <div className="col-sm-6 m-0 p-0">
                                    <button type="submit" className="btn btn-success add-new p-0 m-0 my-1 ml-1">{(readOnly === true ? "Edit" : "Update")}</button>
                                    <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white p-0 m-0 my-1">Back</button>
                                </div>
                            </div>
                        </div>
                        <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
                        <div className="row  p-3">
                            <div className="col-12 alignCenter">
                                <Input label="Department Name" value={Name}
                                    onChange={(e) => { this.setState({ Name: e.target.value, isBlocking: true }, () => this.saveStateToLocalStorage()) }}
                                    onClear={(value) => { this.setState({ Name: value, isBlocking: true }, () => this.saveStateToLocalStorage()) }} required={true} disabled={readOnly} />
                            </div>
                        </div>
                        <div className="row  p-3">
                            <div className="col-12 alignCenter">
                                <Input label="Location" value={Location}
                                    onChange={(e) => { this.setState({ Location: e.target.value, isBlocking: true }, () => this.saveStateToLocalStorage()) }}
                                    onClear={(value) => { this.setState({ Location: value, isBlocking: true }, () => this.saveStateToLocalStorage()) }} required={true} disabled={readOnly} />
                            </div>
                        </div>
                        <div className="p-0 m-0 mt-4 mb-3 row alignCenter">
                            <div className="col-12" >
                                <hr className="rounded" />
                            </div>
                        </div>
                        <div className="row p-4 px-5 mx-lg-2">
                            <Address
                                postalAddressProps={{
                                    readOnly: postalAddressReadOnly,
                                    sameResidentialAddress: sameResidentialAddress
                                }}
                                residentialAddressProps={{
                                    headingTitle: 'Department Address',
                                    numberLabel: 'Address Line 1',
                                    streetAddressLabel: 'Address Line 2'
                                }}
                                readOnly={readOnly}
                            />
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export const EditDepartment = connect(mapStateToProps, mapDispatchToProps)(EditDepartmentComponent)
