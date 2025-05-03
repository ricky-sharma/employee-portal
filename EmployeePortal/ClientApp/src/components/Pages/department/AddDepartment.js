import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { DefaultGuid } from '../../../Constants';
import IsNull from '../../common/Common';
import { Address, GetAddressValues } from '../../Core/addressComponents/Address';
import AlertMessage from '../../Core/AlertMessage';
import { WebApi } from '../../helpers/WebApi.ts';
import { mapDispatchToProps, mapStateToProps } from './../../../redux/reducers/userSlice';
import Input from './../../Core/Input';

class AddDepartmentComponent extends Component {
    constructor(props) {
        super(props)
        const { authToken } = props
        this.state = {
            Name: '',
            Location: '',
            token: authToken || '',
            showAlert: false,
            alertType: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.Name === '' || this.state.Location === '') {
            return this.setState({ showAlert: true, alertType: "danger" })
        }
        const addressValues = GetAddressValues() ?? {};
        let url, data, deptAddressId, postAddressId = ''
        url = `/api/Address/`
        data = JSON.stringify({
            "AddressId": `{${DefaultGuid}}`,
            "HouseNumber": addressValues?.houseNumberResiAdd,
            "StreetAddress": addressValues?.streetResiAdd,
            "SuburbCity": addressValues?.suburbCityResiAdd,
            "State": addressValues?.stateResiAdd,
            "PostalCode": addressValues?.postalCodeResiAdd,
            "IsPostalAddress": false
        })
        WebApi(url, data, 'POST')
            .then(response => {
                if (response) {
                    if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                        if (!IsNull(response.id)) {
                            deptAddressId = response.id
                        }
                        url = `/api/Address/`
                        data = JSON.stringify({
                            "AddressId": `{${DefaultGuid}}`,
                            "HouseNumber": addressValues?.houseNumberPostAdd,
                            "StreetAddress": addressValues?.streetPostAdd,
                            "SuburbCity": addressValues?.suburbCityPostAdd,
                            "State": addressValues?.statePostAdd,
                            "PostalCode": addressValues?.postalCodePostAdd,
                            "IsPostalAddress": true,
                        })
                        WebApi(url, data, 'POST')
                            .then(response => {
                                if (response) {
                                    if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                                        if (!IsNull(response.id)) {
                                            postAddressId = response.id
                                        }
                                        url = `/api/Departments`
                                        data = JSON.stringify({
                                            "ID": 0,
                                            "Name": this.state.Name,
                                            "Location": this.state.Location,
                                            "DepartmentAddress": deptAddressId,
                                            "PostalAddress": postAddressId
                                        })
                                        WebApi(url, data, 'POST')
                                            .then(response => {
                                                this.setState({
                                                    showAlert: true,
                                                    alertType: 'success',
                                                    Name: '',
                                                    Location: ''
                                                })
                                            });
                                    }
                                }
                            })
                    }
                }
            })
    }

    handleBack = () => {
        return this.props.navigate(-1)
    }

    render() {
        const { Name, Location, showAlert, alertType } = this.state
        const SuccessMessage = "Department has been added successfully."
        const ErrorMessage = "Name and Location fields cannot be empty."
        let Message
        if (alertType === "success")
            Message = SuccessMessage
        else if (alertType === "danger")
            Message = ErrorMessage

        return (
            <div className="mb-5">
                <Container className="border">
                    <form onSubmit={this.handleSubmit}>
                        <div className="table-title">
                            <div className="row nowrap m-0 p-4">
                                <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">Add<b> Department</b></h2></div>
                                <div className="col-sm-6 m-0 p-0">
                                    <button type="submit" className="btn btn-success add-new p-0 m-0 my-1 ml-1">Save</button>
                                    <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white p-0 m-0 my-1">Back</button>
                                </div>
                            </div>
                        </div>
                        <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
                        <div className="row  p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Department Name" value={Name}
                                    onChange={(e) => {
                                        this.setState({
                                            Name: e.target.value,
                                            successAlert: false,
                                            errorAlert: false
                                        })
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            Name: value
                                        })
                                    }}
                                    required={true} />
                            </div>
                        </div>
                        <div className="row  p-4">
                            <div className="col-12 alignCenter">
                                <Input label="Location" value={Location}
                                    onChange={(e) => {
                                        this.setState({
                                            Location: e.target.value,
                                            successAlert: false,
                                            errorAlert: false
                                        })
                                    }}
                                    onClear={(value) => {
                                        this.setState({
                                            Location: value
                                        })
                                    }}
                                    required={true} />
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
                            />
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export const AddDepartment = connect(mapStateToProps, mapDispatchToProps)(AddDepartmentComponent)
