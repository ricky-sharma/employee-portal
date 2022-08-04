import addMonths from '@jsbits/add-months';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import profileImage from '../../../images/blue-person-icon.png';
import IsNull from '../../Common/Common';
import AlertDialog from '../../Core/AlertDialog';
import AlertMessage from '../../Core/AlertMessage';
import Input from '../../Core/Input';
import { WebApi } from '../../Helpers/WebApi.ts';
const addDays = require('add-days');

export class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showAlert: false,
            alertType: '',
            departmentOptions: [],
            fName: '',
            lName: '',
            gender: '',
            joiningDate: null,
            leavingDate: null,
            mobile: '',
            phone: '',
            email: '',
            linkedinProfile: '',
            salary: '',
            departmentId: '',
            jobTitle: '',
            dateOfBirth: null,
            eduQualification: '',
            employmentType: '',
            identificationDocument: '',
            identificationNumber: '',
            houseNumberResiAdd: '',
            streetResiAdd: '',
            suburbCityResiAdd: '',
            stateResiAdd: '',
            postalCodeResiAdd: '',
            houseNumberPostAdd: '',
            streetPostAdd: '',
            suburbCityPostAdd: '',
            statePostAdd: '',
            postalCodePostAdd: '',
            sameResidentialAddress: false,
            id: 0,
            message: '',
            readOnly: false
        }
        this.id = 0
    }

    componentDidMount = () => {
        let url = `/api/Departments`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    const departments = response.map((dep, index) => { return { value: dep.ID, text: dep.Name + ' (' + dep.Location + ')' } })
                    this.setState({ departmentOptions: departments }, () => {
                    });
                }
            });

        if (this.id !== 0) {
            url = `/api/Employees/` + this.id
            WebApi(url, '', 'GET')
                .then(response => {
                    if (response) {
                        this.setState({
                            fName: response.FirstName, lName: response.LastName, gender: response.Gender, salary: response.Salary,
                            departmentId: response.DepartmentId, jobTitle: response.JobTitle,
                            joiningDate: !IsNull(response.JoiningDate) ? new Date(response.JoiningDate) : null
                        })
                    }
                });
        }
    }

    handleSubmit = () => {
        if (this.state.readOnly) {
            this.setState({ readOnly: false, showAlert: false, alertType: "" })
        }
        else {
            if (this.state.DepartmentId === 'select' || this.state.salary === '' || this.state.jobTitle === '') {
                return this.setState({ showAlert: true, alertType: "danger" })
            }
            let url = `/api/Employees/` + this.id
            let data = JSON.stringify({
                "ID": this.id,
                "DepartmentId": this.state.departmentId,
                "FirstName": this.state.fName,
                "LastName": this.state.lName,
                "Gender": this.state.gender,
                "Salary": this.state.salary,
                "JobTitle": this.state.jobTitle,
                "JoiningDate": this.state.joiningDate
            })
            WebApi(url, data, 'PUT')
                .then(response => {
                    if (response) {
                        if (response.Message && response.Message.toUpperCase() === "SUCCESS") {
                            this.setState({ readOnly: true })
                            AlertDialog('Employee data saved successfully.')
                        }
                    }
                });
        }
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    handleDOB = date => {
        this.setState({
            dateOfBirth: date
        }, () => {
        });
    }

    handleJoiningDate = date => {
        this.setState({
            joiningDate: date
        }, () => {
        });
    }

    handleLeavingDate = (date) => {
        this.setState({
            leavingDate: date
        }, () => {
        });
    }

    handleCheckboxSameResiAddress = (e) => {
        this.setState({
            sameResidentialAddress: e.target.checked
        }, () => {
            if (this.state.sameResidentialAddress) {
                this.setState({
                    houseNumberPostAdd: this.state.houseNumberResiAdd,
                    streetPostAdd: this.state.streetResiAdd,
                    suburbCityPostAdd: this.state.suburbCityResiAdd,
                    statePostAdd: this.state.stateResiAdd,
                    postalCodePostAdd: this.state.postalCodeResiAdd,
                    readOnly: true
                })
            }
            else {
                this.setState({
                    readOnly: false
                })
            }
        })
    }

    render() {
        if (this.props.location && this.props.location.state)
            this.id = this.props.location.state
        const GenderOptions = [{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]
        const EmploymentTypes = [{ value: "FULL TIME", text: "Full Time" }, { value: "PART TIME", text: "Part Time" }, { value: "CASUAL", text: "Casual" },
        { value: "TEMPORARY", text: "Temporary" }]
        const IdentificationDocuments = [{ value: "Driver's Licence", text: "Driver's Licence" }, { value: "Passport", text: "Passport" },
        { value: "Birth Certificate", text: "Birth Certificate" }];
        const { fName, lName, gender, salary, departmentId, jobTitle, showAlert, alertType, employmentType, identificationNumber, identificationDocument,
            message, readOnly, dateOfBirth, phone, mobile, email, linkedinProfile, joiningDate, leavingDate, eduQualification, houseNumberResiAdd,
            streetResiAdd, suburbCityResiAdd, stateResiAdd, postalCodeResiAdd, houseNumberPostAdd, streetPostAdd, suburbCityPostAdd, statePostAdd,
            postalCodePostAdd, departmentOptions, sameResidentialAddress } = this.state
        const SuccessMessage = "Employee data has been edited successfully."
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
            <Container className="mx-0 px-0">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap m-0 p-0">
                            <div className="col-sm-9 p-0"><h2>Employee<b> Details</b></h2></div>
                            <div className="col-sm-3 p-0">
                                <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success add-new ml-1">Save</button>
                                <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white">Back</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="border p-4 pb-5">
                            <form>
                                <div className="col-12 p-0 m-0 row">
                                    <div className="col-4 p-0">
                                        <div className="col-12 p-0">
                                            <div className="col-6 p-0">
                                                <img className="profileImage" src={profileImage} ></img>
                                            </div>
                                            <div className="col-6 p-0">
                                            </div>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="col-5 p-0 alignCenter">
                                                <h5 className="mt-4 mb-4">
                                                    {fName} {lName}
                                                </h5>
                                            </div>
                                            <div className="col-7 p-0">
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 p-0">
                                        <div className="col-12 p-0 m-0 row">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="First name" value={fName} onChange={(e) => { this.setState({ fName: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ fName: value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Last name" value={lName} onChange={(e) => { this.setState({ lName: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ lName: value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" value={gender} labelId="gender" labelText="Gender" options={GenderOptions}
                                                        onChange={(e) => { this.setState({ gender: e.target.value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="dateMonth" label="Date of Birth" value={dateOfBirth}
                                                        onChange={this.handleDOB} minDate={new Date('01/01/' + new Date().getFullYear())}
                                                        maxDate={addDays(addMonths(new Date('01/01/' + new Date().getFullYear()), 12), -1)}
                                                        onClear={(value) => { this.setState({ dateOfBirth: value }) }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Mobile number" value={mobile} onChange={(e) => { this.setState({ mobile: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ mobile: value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Home Phone" value={phone} onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ phone: value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Email address" value={email} onChange={(e) => { this.setState({ email: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ email: value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0 wrapperLink">
                                                    <Input label="Linkedin/Github link" className="inputLink" value={linkedinProfile} onChange={(e) => { this.setState({ linkedinProfile: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ linkedinProfile: value }) }} />
                                                    <div className="iconLink"><a href={linkedinProfile.indexOf('https:') === 0 ? linkedinProfile : 'https://' + linkedinProfile} target="_blank">
                                                        <i className="fa fa-external-link link-icon" aria-hidden="true" style={{ "display": (this.state.linkedinProfile === '' ? "none" : "") }}></i></a></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 p-0 m-0 mt-4 mb-3 row">
                                    <hr className="rounded" />
                                </div>
                                <div className="col-12 p-0">
                                    <div className="col-12 p-0 m-0 row">
                                        <div className="col-12 p-0">
                                            <h6>Job Detail </h6>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" value={departmentId} labelId="departmentId"
                                                        labelText="BU/Department" options={departmentOptions} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ departmentId: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Job Title" value={jobTitle} onChange={(e) => { this.setState({ jobTitle: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ jobTitle: value }) }} customClass="fullWidth" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" value={employmentType} labelId="employmentType"
                                                        labelText="Employment type" options={EmploymentTypes} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ employmentType: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Education Qualification" value={eduQualification}
                                                        onChange={(e) => { this.setState({ eduQualification: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ eduQualification: value }) }} customClass="fullWidth" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="date" label="Joining date" value={joiningDate}
                                                        onChange={this.handleJoiningDate} customClass="fullWidth customDate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="date" label="Leaving date" value={leavingDate}
                                                        onChange={this.handleLeavingDate} minDate={joiningDate !== '' ? joiningDate : new Date()}
                                                        customClass="fullWidth customDate" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" value={identificationDocument} labelId="identificationDocument"
                                                        labelText="Identification document" options={IdentificationDocuments} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ identificationDocument: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Identification number" value={identificationNumber}
                                                        onChange={(e) => { this.setState({ identificationNumber: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ identificationNumber: value }) }} customClass="fullWidth" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 p-0 m-0 mt-4 mb-3 row">
                                    <hr className="rounded" />
                                </div>
                                <div className="col-12 p-0 fullInputWidth">
                                    <div className="col-12 p-0 m-0 row">
                                        <div className="col-12 p-0">
                                            <h6>Residential Address</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                <Input label="House/Unit number" value={houseNumberResiAdd}
                                                    onChange={(e) => { this.setState({ houseNumberResiAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ houseNumberResiAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="Street address" value={streetResiAdd}
                                                    onChange={(e) => { this.setState({ streetResiAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ streetResiAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                <Input label="Suburb/City" value={suburbCityResiAdd}
                                                    onChange={(e) => { this.setState({ suburbCityResiAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ suburbCityResiAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="State" value={stateResiAdd}
                                                    onChange={(e) => { this.setState({ stateResiAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ stateResiAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-3">

                                            <div className="col-12 p-0">
                                                <Input label="Postal code" value={postalCodeResiAdd}
                                                    onChange={(e) => { this.setState({ postalCodeResiAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ postalCodeResiAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 p-0 m-0 mt-4 mb-3 row">
                                </div>
                                <div className="col-12 p-0 fullInputWidth">
                                    <div className="col-12 p-0 m-0 row">
                                        <div className="col-12 p-0">
                                            <h6>Postal Address</h6>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-12 p-0 m-0 row valignCenter">
                                            <Input label="Same as Residential Address" checked={sameResidentialAddress} type="checkbox"
                                                onChange={this.handleCheckboxSameResiAddress} />
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                <Input label="House/Unit number" value={houseNumberPostAdd}
                                                    className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ houseNumberPostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ houseNumberPostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="Street address" value={streetPostAdd}
                                                    onChange={(e) => { this.setState({ streetPostAdd: e.target.value }) }}
                                                    className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onClear={(value) => { this.setState({ streetPostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                <Input label="Suburb/City" value={suburbCityPostAdd} className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ suburbCityPostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ suburbCityPostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="State" value={statePostAdd} className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ statePostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ statePostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-3">
                                            <div className="col-12 p-0">
                                                <Input label="Postal code" value={postalCodePostAdd} className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ postalCodePostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ postalCodePostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
                    </div>
                </div>
            </Container>
        )
    }
}

export default EditEmployee
