import React, { Component, createRef } from 'react';
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { Container } from 'reactstrap';
import { DefaultGuid } from '../../../Constants';
import AlertMessage from '../../Core/AlertMessage';
import AlertDialog from '../../Core/ModalDialogs';
import { Address, GetAddressValues } from '../../Core/addressComponents/Address';
import IsNull from '../../common/Common';
import { WebApi } from '../../helpers/WebApi.ts';
import { mapDispatchToProps, mapStateToProps } from './../../../redux/reducers/userSlice';
import Input from './../../Core/Input';

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
            deptAddress: {},
            postalAddress: {}
        }
        this.id = 0;
        this.deptAddressId = '';
        this.postAddressId = '';
        this.addressRef = createRef(null);
    }

    saveStateToLocalStorage() {
        const user = this.props?.username
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key + user, JSON.stringify(this.state[key]));
        }
        localStorage.setItem(`id${user}`, this.id);
    }

    hydrateStateWithLocalStorage() {
        const user = this.props?.username
        // for every item in React state
        this.setState({
            Name: JSON.parse(localStorage.getItem(`Name${user}`)),
            Location: JSON.parse(localStorage.getItem(`Location${user}`)),
            showAlert: JSON.parse(localStorage.getItem(`showAlert${user}`)),
            alertType: JSON.parse(localStorage.getItem(`alertType${user}`)),
            message: JSON.parse(localStorage.getItem(`message${user}`)),
            readOnly: JSON.parse(localStorage.getItem(`readOnly${user}`)),
            isBlocking: JSON.parse(localStorage.getItem(`isBlocking${user}`))
        });
        this.id = localStorage.getItem(`id${user}`)
    }

    componentDidMount = () => {
        const user = this.props?.username
        const setAddressValues = this.addressRef.current ?
            this.addressRef.current.setAddressStateValue : null;
        if (this.id !== 0 && !localStorage.getItem(`id${user}`)) {
            let url = `/api/Departments/${this.id}`
            WebApi(url, '', 'GET')
                .then(response => {
                    if (response) {
                        this.deptAddressId = response.DepartmentAddress
                        this.postAddressId = response.PostalAddress
                        this.setState({
                            Name: response.Name,
                            Location: response.Location
                        }, () => this.saveStateToLocalStorage())
                    }
                })
                .then(() => {
                    if (this.deptAddressId !== DefaultGuid) {
                        url = `/api/Address/${this.deptAddressId}`
                        WebApi(url, '', 'GET')
                            .then(response => {
                                if (response && setAddressValues !== null) {
                                    this.setState({
                                        deptAddress: response
                                    }, () => {
                                        if (this.postAddressId !== DefaultGuid) {
                                            url = `/api/Address/${this.postAddressId}`
                                            WebApi(url, '', 'GET')
                                                .then(response => {
                                                    if (response && setAddressValues !== null) {
                                                        this.setState({
                                                            postalAddress: response
                                                        }, () => {
                                                            let sameAsResidentialAddress = false;
                                                            if (
                                                                this.state.deptAddress?.HouseNumber !== '' &&
                                                                this.state.deptAddress.HouseNumber === this.state.postalAddress.HouseNumber &&
                                                                this.state.deptAddress.StreetAddress === this.state.postalAddress.StreetAddress &&
                                                                this.state.deptAddress.SuburbCity === this.state.postalAddress.SuburbCity &&
                                                                this.state.deptAddress.State === this.state.postalAddress.State &&
                                                                this.state.deptAddress.PostalCode === this.state.postalAddress.PostalCode
                                                            ) {
                                                                sameAsResidentialAddress = true;
                                                            }
                                                            setAddressValues(addressState => ({
                                                                ...addressState,
                                                                ...{
                                                                    houseNumberResiAdd: this.state.deptAddress.HouseNumber ?? '',
                                                                    streetResiAdd: this.state.deptAddress.StreetAddress ?? '',
                                                                    suburbCityResiAdd: this.state.deptAddress.SuburbCity ?? '',
                                                                    stateResiAdd: this.state.deptAddress.State ?? '',
                                                                    postalCodeResiAdd: this.state.deptAddress.PostalCode ?? '',
                                                                    houseNumberPostAdd: this.state.postalAddress.HouseNumber ?? '',
                                                                    streetPostAdd: this.state.postalAddress.StreetAddress ?? '',
                                                                    suburbCityPostAdd: this.state.postalAddress.SuburbCity ?? '',
                                                                    statePostAdd: this.state.postalAddress.State ?? '',
                                                                    postalCodePostAdd: this.state.postalAddress.PostalCode ?? '',
                                                                    sameAsResidentialAddress: sameAsResidentialAddress
                                                                }
                                                            }))
                                                        })
                                                    }
                                                });
                                        }
                                    })
                                }
                            })
                    }
                });
        }
        else {
            this.hydrateStateWithLocalStorage();
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.readOnly) {
            this.setState({
                readOnly: false,
                showAlert: false,
                alertType: ""
            })
        }
        else {
            if (this.state.Name === '' || this.state.Location === '') {
                return this.setState({
                    showAlert: true,
                    alertType: "danger"
                })
            }
            const addressValues = GetAddressValues() ?? {};
            let url, data = ''
            url = !IsNull(this.deptAddressId) && this.deptAddressId !== DefaultGuid ?
                `/api/Address/${this.deptAddressId}` : `/api/Address/`
            data = JSON.stringify({
                "AddressId": !IsNull(this.deptAddressId) && this.deptAddressId !== DefaultGuid ?
                    this.deptAddressId : `{${DefaultGuid}}`,
                "HouseNumber": addressValues?.houseNumberResiAdd,
                "StreetAddress": addressValues?.streetResiAdd,
                "SuburbCity": addressValues?.suburbCityResiAdd,
                "State": addressValues?.stateResiAdd,
                "PostalCode": addressValues?.postalCodeResiAdd,
                "IsPostalAddress": false
            })
            WebApi(url, data, !IsNull(this.deptAddressId) && this.deptAddressId !== DefaultGuid ? 'PUT' : 'POST')
                .then(response => {
                    if (response) {
                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                            if (!IsNull(response.id)) {
                                this.deptAddressId = response.id
                            }
                            url = !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ?
                                `/api/Address/${this.postAddressId}` : `/api/Address/`
                            data = JSON.stringify({
                                "AddressId": !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ?
                                    this.postAddressId : `{${DefaultGuid}}`,
                                "HouseNumber": addressValues?.houseNumberPostAdd,
                                "StreetAddress": addressValues?.streetPostAdd,
                                "SuburbCity": addressValues?.suburbCityPostAdd,
                                "State": addressValues?.statePostAdd,
                                "PostalCode": addressValues?.postalCodePostAdd,
                                "IsPostalAddress": true,
                            })
                            WebApi(url, data, !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ? 'PUT' : 'POST')
                                .then(response => {
                                    if (response) {
                                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                                            if (!IsNull(response.id)) {
                                                this.postAddressId = response.id
                                            }
                                            url = `/api/Departments/${this.id}`
                                            data = JSON.stringify({
                                                "ID": this.id,
                                                "Name": this.state.Name,
                                                "Location": this.state.Location,
                                                "DepartmentAddress": this.deptAddressId,
                                                "PostalAddress": this.postAddressId
                                            })
                                            WebApi(url, data, 'PUT')
                                                .then(response => {
                                                    if (response.Message && response.Message.toUpperCase() === "SUCCESS") {
                                                        this.setState({
                                                            readOnly: true,
                                                            isBlocking: false
                                                        })
                                                        AlertDialog('Department data saved successfully.')
                                                    }
                                                    else
                                                        AlertDialog('Some error occured, please try again.')
                                                });
                                        }
                                    }
                                })
                        }
                    }
                })

        }
    }

    handleBack = () => {
        this.setState({
            backClicked: true
        })
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
        localStorage.removeItem(`id${user}`);
    }

    render() {
        if (this.state.backClicked) {
            return <Navigate to='/Departments' />
        }
        const user = this.props?.username
        const { Name, Location, showAlert, alertType, message, readOnly } = this.state
        const { location } = this.props;
        if (location && location.state)
            this.id = location.state

        if ((!this.id || this.id === 0) && !localStorage.getItem(`id${user}`)) {
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
                                <Input
                                    label="Department Name"
                                    value={Name}
                                    onChange={(e) => {
                                        this.setState({
                                            Name: e.target.value,
                                            isBlocking: true
                                        }, () => this.saveStateToLocalStorage())
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            Name: value,
                                            isBlocking: true
                                        }, () => this.saveStateToLocalStorage())
                                    }}
                                    required={true}
                                    className={(readOnly === true ? "disabled-inputs" : "")}
                                    disabled={(readOnly === true ? true : false)} />
                            </div>
                        </div>
                        <div className="row  p-3">
                            <div className="col-12 alignCenter">
                                <Input
                                    label="Location"
                                    value={Location}
                                    onChange={(e) => {
                                        this.setState({
                                            Location: e.target.value,
                                            isBlocking: true
                                        }, () => this.saveStateToLocalStorage())
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            Location: value,
                                            isBlocking: true
                                        }, () => this.saveStateToLocalStorage())
                                    }}
                                    required={true}
                                    className={(readOnly === true ? "disabled-inputs" : "")}
                                    disabled={(readOnly === true ? true : false)} />
                            </div>
                        </div>
                        <div className="p-0 m-0 mt-4 mb-3 row alignCenter">
                            <div className="col-12" >
                                <hr className="rounded" />
                            </div>
                        </div>
                        <div className="row p-4 px-5 mx-lg-2">
                            <Address
                                residentialAddressProps={{
                                    headingTitle: 'Department Address',
                                    numberLabel: 'Address Line 1',
                                    streetAddressLabel: 'Address Line 2'
                                }}
                                readOnly={readOnly}
                                ref={this.addressRef}
                            />
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export const EditDepartment = connect(mapStateToProps, mapDispatchToProps)(EditDepartmentComponent)
