import addMonths from '@jsbits/add-months';
import addDays from 'add-days';
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import validator from 'validator';
import { Locale, LocaleCode, PhoneNumberRegex } from '../../../Constants';
import profileImage from '../../../images/blue-person-icon.png';
import IsNull from '../../Common/Common';
import AlertDialog from '../../Core/AlertDialog';
import Input from '../../Core/Input';
import { WebApi } from '../../Helpers/WebApi.ts';

export class EditEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            departmentOptions: [],
            fName: '',
            fNameError: false,
            lName: '',
            lNameError: false,
            gender: '',
            genderError: false,
            joiningDate: null,
            joiningDateError: false,
            joiningDateErrorText: '',
            leavingDate: null,
            leavingDateError: false,
            leavingDateErrorText: '',
            mobile: '',
            mobileError: false,
            mobileErrorText: '',
            phone: '',
            phoneError: false,
            phoneErrorText: '',
            email: '',
            emailError: false,
            emailErrorText: '',
            linkedinProfile: '',
            salary: '',
            departmentId: '',
            departmentError: false,
            jobTitle: '',
            jobTitleError: false,
            dateOfBirth: null,
            dateOfBirthError: false,
            employmentType: '',
            employmentTypeError: false,
            eduQualification: '',
            eduQualificationError: false,
            identificationDocument: '',
            identificationDocumentError: false,
            identificationNumber: '',
            identificationNumberError: false,
            houseNumberResiAdd: '',
            houseNumberResiAddError: false,
            streetResiAdd: '',
            suburbCityResiAdd: '',
            suburbCityResiAddError: false,
            stateResiAdd: '',
            stateResiAddError: false,
            postalCodeResiAdd: '',
            postalCodeResiAddError: false,
            postalCodeResiAddErrorText: '',
            houseNumberPostAdd: '',
            houseNumberPostAddError: false,
            streetPostAdd: '',
            suburbCityPostAdd: '',
            suburbCityPostAddError: false,
            statePostAdd: '',
            statePostAddError: false,
            postalCodePostAdd: '',
            postalCodePostAddError: false,
            postalCodePostAddErrorText: false,
            sameResidentialAddress: false,
            id: 0,
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
        if (this.validate() === true) {
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
                            AlertDialog('Employee data saved successfully.')
                        }
                    }
                })
        }
    }

    validate = () => {
        let fieldValuesToValidate = [
            { value: this.state.fName, errorType: 'fNameError' }, { value: this.state.lName, errorType: 'lNameError' },
            { value: this.state.departmentId, errorType: 'departmentError' }, { value: this.state.gender, errorType: 'genderError' },
            { value: this.state.dateOfBirth, errorType: 'dateOfBirthError' }, { value: this.state.joiningDate, errorType: 'joiningDateError' },
            { value: this.state.mobile, errorType: 'mobileError' }, { value: this.state.phone, errorType: 'phoneError' },
            { value: this.state.email, errorType: 'emailError' }, { value: this.state.jobTitle, errorType: 'jobTitleError' },
            { value: this.state.eduQualification, errorType: 'eduQualificationError' }, { value: this.state.employmentType, errorType: 'employmentTypeError' },
            { value: this.state.identificationDocument, errorType: 'identificationDocumentError' }, { value: this.state.identificationNumber, errorType: 'identificationNumberError' },
            { value: this.state.houseNumberResiAdd, errorType: 'houseNumberResiAddError' }, { value: this.state.suburbCityResiAdd, errorType: 'suburbCityResiAddError' },
            { value: this.state.stateResiAdd, errorType: 'stateResiAddError' }, { value: this.state.postalCodeResiAdd, errorType: 'postalCodeResiAddError' },
            { value: this.state.houseNumberPostAdd, errorType: 'houseNumberPostAddError' }, { value: this.state.suburbCityPostAdd, errorType: 'suburbCityPostAddError' },
            { value: this.state.statePostAdd, errorType: 'statePostAddError' }, { value: this.state.postalCodePostAdd, errorType: 'postalCodePostAddError' },
            { value: this.state.leavingDate, errorType: 'leavingDateError' }
        ]

        let isValid = fieldValuesToValidate.map((i, k) => {
            if (IsNull(i.value)) {
                if (i.errorType === 'mobileError' || i.errorType === 'phoneError') {
                    if (!IsNull(this.state.phone) || !IsNull(this.state.mobile)) { this.setState({ [i.errorType]: false }); return true }
                    else {
                        this.setState({
                            [i.errorType]: true,
                            phoneErrorText: 'Mobile and home phone numbers both cannot be empty.',
                            mobileErrorText: 'Mobile and home phone numbers both cannot be empty.'
                        })
                        return false
                    }
                }
                else if (i.errorType === 'emailError') {
                    this.setState({ emailErrorText: '' })
                }
                else if (i.errorType === 'joiningDateError') { this.setState({ joiningDateErrorText: '' }) }
                else if (i.errorType === 'leavingDateError') { this.setState({ [i.errorType]: false, leavingDateErrorText: '' }); return true }
                else if (i.errorType === 'postalCodeResiAddError') { this.setState({ postalCodeResiAddErrorText: '' }) }
                else if (i.errorType === 'postalCodePostAddError') { this.setState({ postalCodePostAddErrorText: '' }) }
                if (this.state.sameResidentialAddress && (i.errorType === 'houseNumberPostAddError' || i.errorType === 'suburbCityPostAddError'
                    || i.errorType === 'statePostAddError' || i.errorType === 'postalCodePostAddError')) {
                    this.setState({ [i.errorType]: false })
                    return true
                }
                this.setState({ [i.errorType]: true }); return false
            }
            else if (!IsNull(i.value)) {
                if (i.errorType === 'mobileError' && !validator.isMobilePhone(i.value, Locale)) {
                    this.setState({
                        [i.errorType]: true,
                        mobileErrorText: 'Please enter a valid mobile number.'
                    })
                    return false
                }
                if (i.errorType === 'phoneError' && !PhoneNumberRegex.test(i.value)) {
                    this.setState({
                        [i.errorType]: true,
                        phoneErrorText: 'Please enter a valid home number.'
                    })
                    return false
                }
                if (i.errorType === 'emailError' && !validator.isEmail(i.value)) {
                    this.setState({
                        [i.errorType]: true,
                        emailErrorText: 'Please enter a valid email.'
                    })
                    return false
                }
                if (i.errorType === 'joiningDateError' && !validator.isDate(i.value)) {
                    this.setState({
                        [i.errorType]: true,
                        joiningDateErrorText: 'Please enter a valid joining date.'
                    })
                    return false
                }
                if (i.errorType === 'leavingDateError' && !validator.isDate(i.value)) {
                    this.setState({
                        [i.errorType]: true,
                        leavingDateErrorText: 'Please enter a valid leaving date.'
                    })
                    return false
                }
                if (i.errorType === 'postalCodeResiAddError' && !validator.isPostalCode(i.value, LocaleCode)) {
                    this.setState({
                        [i.errorType]: true,
                        postalCodeResiAddErrorText: 'Please enter a valid postal code.'
                    })
                    return false
                }
                if (!this.state.sameResidentialAddress && i.errorType === 'postalCodePostAddError' && !validator.isPostalCode(i.value, LocaleCode)) {
                    this.setState({
                        [i.errorType]: true,
                        postalCodePostAddErrorText: 'Please enter a valid postal code.'
                    })
                    return false
                }
            }
            this.setState({
                [i.errorType]: false
            })
            return true
        })
        return !isValid.some(x => x === false)
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
        const { fName, lName, gender, salary, departmentId, jobTitle, employmentType, identificationNumber, identificationDocument, readOnly, dateOfBirth,
            phone, mobile, email, linkedinProfile, joiningDate, leavingDate, eduQualification, houseNumberResiAdd, streetResiAdd, suburbCityResiAdd,
            stateResiAdd, postalCodeResiAdd, houseNumberPostAdd, streetPostAdd, suburbCityPostAdd, statePostAdd, postalCodePostAdd, departmentOptions,
            sameResidentialAddress, fNameError, lNameError, departmentError, genderError, dateOfBirthError, joiningDateError, mobileError, identificationNumberError,
            phoneError, emailError, jobTitleError, eduQualificationError, employmentTypeError, identificationDocumentError, houseNumberResiAddError,
            suburbCityResiAddError, stateResiAddError, postalCodeResiAddError, houseNumberPostAddError, suburbCityPostAddError, statePostAddError,
            postalCodePostAddError, leavingDateError, phoneErrorText, mobileErrorText, emailErrorText, joiningDateErrorText, leavingDateErrorText,
            postalCodeResiAddErrorText, postalCodePostAddErrorText } = this.state
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
                                            <div className="col-5 p-0 alignCenter txt-center">
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
                                                    <Input label="First name" error={fNameError} value={fName} onChange={(e) => { this.setState({ fName: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ fName: value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Last name" error={lNameError} value={lName} onChange={(e) => { this.setState({ lName: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ lName: value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" error={genderError} value={gender} labelId="gender" label="Gender" options={GenderOptions}
                                                        onChange={(e) => { this.setState({ gender: e.target.value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="dateMonth" error={dateOfBirthError} label="Date of Birth" value={dateOfBirth}
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
                                                    <Input label="Mobile number" helperText={mobileErrorText} error={mobileError} dataType="number" value={mobile}
                                                        onChange={(e) => { this.setState({ mobile: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ mobile: value }) }} />
                                                </div>
                                            </div>
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Home Phone" helperText={phoneErrorText} error={phoneError} dataType="number" value={phone}
                                                        onChange={(e) => { this.setState({ phone: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ phone: value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0 m-0 row mt-3">
                                            <div className="col-6 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Email address" helperText={emailErrorText} error={emailError} dataType="email" value={email}
                                                        onChange={(e) => { this.setState({ email: e.target.value }) }}
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
                                            <h6>Employment/Professional Detail </h6>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" error={departmentError} value={departmentId} labelId="departmentId"
                                                        label="BU/Department" options={departmentOptions} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ departmentId: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Job Title" error={jobTitleError} value={jobTitle} onChange={(e) => { this.setState({ jobTitle: e.target.value }) }}
                                                        onClear={(value) => { this.setState({ jobTitle: value }) }} customClass="fullWidth" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" error={employmentTypeError} value={employmentType} labelId="employmentType"
                                                        label="Employment type" options={EmploymentTypes} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ employmentType: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Education Qualification" error={eduQualificationError} value={eduQualification}
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
                                                    <Input type="date" label="Joining date" value={joiningDate} error={joiningDateError}
                                                        helperText={joiningDateErrorText} onChange={this.handleJoiningDate} customClass="fullWidth customDate" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="date" label="Leaving date" value={leavingDate} error={leavingDateError}
                                                        onChange={this.handleLeavingDate} minDate={joiningDate !== '' ? joiningDate : new Date()}
                                                        helperText={leavingDateErrorText} customClass="fullWidth customDate" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" error={identificationDocumentError} value={identificationDocument} labelId="identificationDocument"
                                                        label="Identification document" options={IdentificationDocuments} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ identificationDocument: e.target.value }) }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-0 p-0">
                                        </div>
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input label="Identification number" error={identificationNumberError} value={identificationNumber}
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
                                                <Input label="House/Unit number" error={houseNumberResiAddError} value={houseNumberResiAdd}
                                                    onChange={(e) => {
                                                        this.setState((prevState) => ({
                                                            houseNumberResiAdd: e.target.value,
                                                            houseNumberPostAdd: prevState.sameResidentialAddress ? e.target.value : prevState.houseNumberPostAdd
                                                        }))
                                                    }}
                                                    onClear={(value) => {
                                                        this.setState((prevState) => ({
                                                            houseNumberResiAdd: value,
                                                            houseNumberPostAdd: prevState.sameResidentialAddress ? value : prevState.houseNumberPostAdd
                                                        }))
                                                    }} customClass="fullWidth" />
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
                                                <Input label="Suburb/City" error={suburbCityResiAddError} value={suburbCityResiAdd}
                                                    onChange={(e) => {
                                                        this.setState((prevState) => ({
                                                            suburbCityResiAdd: e.target.value,
                                                            suburbCityPostAdd: prevState.sameResidentialAddress ? e.target.value : prevState.suburbCityPostAdd
                                                        }))
                                                    }}
                                                    onClear={(value) => {
                                                        this.setState((prevState) => ({
                                                            suburbCityResiAdd: value,
                                                            suburbCityPostAdd: prevState.sameResidentialAddress ? value : prevState.suburbCityPostAdd
                                                        }))
                                                    }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="State" error={stateResiAddError} value={stateResiAdd}
                                                    onChange={(e) => {
                                                        this.setState((prevState) => ({
                                                            stateResiAdd: e.target.value,
                                                            statePostAdd: prevState.sameResidentialAddress ? e.target.value : prevState.statePostAdd
                                                        }))
                                                    }}
                                                    onClear={(value) => {
                                                        this.setState((prevState) => ({
                                                            stateResiAdd: value,
                                                            statePostAdd: prevState.sameResidentialAddress ? value : prevState.statePostAdd
                                                        }))
                                                    }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-3">

                                            <div className="col-12 p-0">
                                                <Input label="Postal code" error={postalCodeResiAddError} value={postalCodeResiAdd}
                                                    onChange={(e) => {
                                                        this.setState((prevState) => ({
                                                            postalCodeResiAdd: e.target.value,
                                                            postalCodePostAdd: prevState.sameResidentialAddress ? e.target.value : prevState.postalCodePostAdd
                                                        }))
                                                    }}
                                                    onClear={(value) => {
                                                        this.setState((prevState) => ({
                                                            postalCodeResiAdd: value,
                                                            postalCodePostAdd: prevState.sameResidentialAddress ? value : prevState.postalCodePostAdd
                                                        }))
                                                    }} customClass="fullWidth" helperText={postalCodeResiAddErrorText} />
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
                                                <Input label="House/Unit number" error={houseNumberPostAddError} value={houseNumberPostAdd}
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
                                                <Input label="Suburb/City" error={suburbCityPostAddError} value={suburbCityPostAdd} className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ suburbCityPostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ suburbCityPostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0">
                                            <div className="col-12 p-0">
                                                <Input label="State" error={statePostAddError} value={statePostAdd} className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ statePostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ statePostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                        <div className="col-3 p-0 pl-3">
                                            <div className="col-12 p-0">
                                                <Input label="Postal code" helperText={postalCodePostAddErrorText} error={postalCodePostAddError} value={postalCodePostAdd}
                                                    className={(readOnly === true ? "disabled-inputs" : "")}
                                                    onChange={(e) => { this.setState({ postalCodePostAdd: e.target.value }) }}
                                                    onClear={(value) => { this.setState({ postalCodePostAdd: value }) }} customClass="fullWidth" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

export default EditEmployee
