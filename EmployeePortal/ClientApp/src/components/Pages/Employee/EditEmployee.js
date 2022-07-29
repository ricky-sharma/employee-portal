import addMonths from '@jsbits/add-months';
import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import { Container } from 'reactstrap';
import profileImage from '../../../images/blue-person-icon.png';
import IsNull from '../../Common/Common';
import AlertDialog from '../../Core/AlertDialog';
import AlertMessage from '../../Core/AlertMessage';
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
            joiningDate: '',
            leavingDate: '',
            mobile: '',
            phone: '',
            email: '',
            linkedinProfile: '',
            salary: '',
            departmentId: '',
            jobTitle: '',
            dateOfBirth: '',
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
                    const departments = response.map((dep, index) => <option key={index + 1} value={dep.ID}>{dep.Name} ({dep.Location}) </option>)
                    this.setState({ departmentOptions: departments }, () => {
                    });
                }
            });

        if (this.id !== 0) {
            url = `/api/Employees/` + this.id
            WebApi(url, '', 'GET')
                .then(response => {
                    if (response) {
                        console.log(response)
                        this.setState({
                            fName: response.FirstName, lName: response.LastName, gender: response.Gender, salary: response.Salary,
                            departmentId: response.DepartmentId, jobTitle: response.JobTitle,
                            joiningDate: !IsNull(response.JoiningDate) ? new Date(response.JoiningDate) : ''
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

    handleLeavingDate = date => {
        this.setState({
            leavingDate: date
        }, () => {
        });
    }

    render(props) {
        if (this.props.location && this.props.location.state)
            this.id = this.props.location.state
        const GenderOptions = [<option key="1" value="Male">Male</option>,
        <option key="2" value="Female">Female</option>];
        const EmploymentTypes = [<option key="1" value="FULL TIME">Full Time</option>,
        <option key="2" value="PART TIME">Part Time</option>, <option key="3" value="CASUAL">Casual</option>, <option key="4" value="TEMPORARY">Temporary</option>];
        const IdentificationDocuments = [<option key="1" value="Driver's Licence">Driver's Licence</option>,
        <option key="2" value="Passport">Passport</option>, <option key="3" value="Birth Certificate">Birth Certificate</option>];
        const { fName, lName, gender, salary, departmentId, jobTitle, showAlert, alertType, employmentType, identificationNumber, identificationDocument,
            message, readOnly, dateOfBirth, phone, mobile, email, linkedinProfile, joiningDate, leavingDate, eduQualification, houseNumberResiAdd,
            streetResiAdd, suburbCityResiAdd, stateResiAdd, postalCodeResiAdd, houseNumberPostAdd, streetPostAdd, suburbCityPostAdd, statePostAdd,
            postalCodePostAdd } = this.state
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
                                                <div className="col-12 p-0">First name</div>
                                                <div className="col-12 p-0">
                                                    <input value={fName} onChange={(e) => { this.setState({ fName: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Last name</div>
                                                <div className="col-12 p-0">
                                                    <input value={lName} onChange={(e) => { this.setState({ lName: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Gender</div>
                                                <div className="col-12 p-0">
                                                    <select value={gender} onChange={(e) => { this.setState({ gender: e.target.value }) }}>
                                                        <option key="0" value="select">Select</option>{GenderOptions}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Date of Birth</div>
                                                <div className="col-12 p-0">
                                                    <DatePicker minDate={new Date('01/01/' + new Date().getFullYear())}
                                                        maxDate={addDays(addMonths(new Date('01/01/' + new Date().getFullYear()), 12), -1)}
                                                        placeholderText="DD/MM" dateFormat="dd/MM" selected={dateOfBirth} onChange={this.handleDOB} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Mobile number</div>
                                                <div className="col-12 p-0">
                                                    <input value={mobile} onChange={(e) => { this.setState({ mobile: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Home Phone</div>
                                                <div className="col-12 p-0">
                                                    <input value={phone} onChange={(e) => { this.setState({ phone: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Email address</div>
                                                <div className="col-12 p-0">
                                                    <input value={email} onChange={(e) => { this.setState({ email: e.target.value }) }} type="text" />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">Linkedin/Github link</div>
                                                <div className="col-12 p-0">
                                                    <input value={linkedinProfile} onChange={(e) => { this.setState({ linkedinProfile: e.target.value }) }} type="text" />
                                                    <a href={linkedinProfile.indexOf('https:') === 0 ? linkedinProfile : 'https://' + linkedinProfile} target="_blank">
                                                        <i className="fa fa-external-link link-icon" aria-hidden="true"></i></a>
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
                                            <h6>Professional Detail </h6>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    BU/Department
                                                </div>
                                                <div className="col-12 p-0">
                                                    <select value={departmentId} onChange={(e) => { this.setState({ departmentId: e.target.value }) }}>
                                                        <option key="0" value="select">Select</option>{this.state.departmentOptions}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Job Title
                                                </div>
                                                <div className="col-12 p-0">
                                                    <input value={jobTitle} onChange={(e) => { this.setState({ jobTitle: e.target.value }) }} type="text"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Employment type
                                                </div>
                                                <div className="col-12 p-0">
                                                    <select value={employmentType} onChange={(e) => { this.setState({ employmentType: e.target.value }) }}>
                                                        <option key="0" value="select">Select</option>{EmploymentTypes}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Education Qualification
                                                </div>
                                                <div className="col-12 p-0">
                                                    <input value={eduQualification} onChange={(e) => { this.setState({ eduQualification: e.target.value }) }}
                                                        type="text"></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Joining date
                                                </div>
                                                <div className="col-12 p-0">
                                                    <DatePicker placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy" selected={joiningDate}
                                                        onChange={this.handleJoiningDate} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Leaving date
                                                </div>
                                                <div className="col-12 p-0">
                                                    <DatePicker placeholderText="DD/MM/YYYY" dateFormat="dd/MM/yyyy" selected={leavingDate}
                                                        minDate={joiningDate !== '' ? joiningDate : new Date()} onChange={this.handleLeavingDate} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Identification document
                                                </div>
                                                <div className="col-12 p-0">
                                                    <select value={identificationDocument} onChange={(e) => { this.setState({ identificationDocument: e.target.value }) }}>
                                                        <option key="0" value="select">Select</option>{IdentificationDocuments}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    Identification number
                                                </div>
                                                <div className="col-12 p-0">
                                                    <input value={identificationNumber} onChange={(e) => { this.setState({ identificationNumber: e.target.value }) }}
                                                        type="text"></input>
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
                                                House/Unit number
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={houseNumberResiAdd} onChange={(e) => { this.setState({ houseNumberResiAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-12 p-0">
                                                Street address
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={streetResiAdd} onChange={(e) => { this.setState({ streetResiAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                Suburb/City
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={suburbCityResiAdd} onChange={(e) => { this.setState({ suburbCityResiAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                State
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={stateResiAdd} onChange={(e) => { this.setState({ stateResiAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-3">
                                            <div className="col-12 p-0">
                                                Postal code
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={postalCodeResiAdd} onChange={(e) => { this.setState({ postalCodeResiAdd: e.target.value }) }}
                                                    type="text"></input>
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
                                        <div className="col-4 p-0 m-0 row">
                                            
                                            <div className="col-7 p-0">
                                                Same as Residential address
                                            </div>
                                            <div className="col-1 p-0">
                                                <input onChange={(e) => { this.setState({ houseNumberPostAdd: e.target.value }) }}
                                                    type="checkbox"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                House/Unit number
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={houseNumberPostAdd} onChange={(e) => { this.setState({ houseNumberPostAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-12 p-0">
                                                Street address
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={streetPostAdd} onChange={(e) => { this.setState({ streetPostAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0 pr-3">
                                            <div className="col-12 p-0">
                                                Suburb/City
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={suburbCityPostAdd} onChange={(e) => { this.setState({ suburbCityPostAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                State
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={statePostAdd} onChange={(e) => { this.setState({ statePostAdd: e.target.value }) }}
                                                    type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-1">
                                            <div className="col-12 p-0">
                                                Postal code
                                            </div>
                                            <div className="col-12 p-0">
                                                <input value={postalCodePostAdd} onChange={(e) => { this.setState({ postalCodePostAdd: e.target.value }) }}
                                                    type="text"></input>
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
