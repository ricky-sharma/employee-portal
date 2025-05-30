import addMonths from '@jsbits/add-months';
import { PhotoCamera, RemoveCircle } from '@mui/icons-material';
import { Avatar, IconButton } from '@mui/material';
import addDays from 'add-days';
import React, { Component } from 'react';
import validator from 'validator';
import { DefaultGuid, EmployeeFolder, Locale, LocaleCode, PhoneNumberRegex } from '../../../Constants';
import profileImage from '../../../images/blue-person-icon.png';
import IsNull, { IsDev } from '../../common/Common';
import Input from '../../Core/Input';
import AlertDialog, { ConfirmDialog } from '../../Core/ModalDialogs';
import { LoadImage } from '../../helpers/ImageHelper';
import { WebApi } from '../../helpers/WebApi.ts';

export class AddEditEmployee extends Component {
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
            postalCodePostAddErrorText: '',
            sameResidentialAddress: false,
            id: 0,
            readOnly: false,
            employeeImage: '',
            employeeImageType: '',
            employeeImageName: '',
            isEmployeeImageChanged: false,
            employeeID: '',
            isActive: true,
            employeeOptions: [],
            employeeSupervisor: '',
            employeeSupervisorError: false
        }
        this.id = ''
        this.resiAddressId = ''
        this.postAddressId = ''
        this.employeeImageRef = React.createRef();
        this.employeeImageInputRef = React.createRef();
    }

    componentDidMount = () => {
        let url = `/api/Departments`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    const departments = response.map((dep, index) => {
                        return {
                            value: dep.ID,
                            text: `${dep.Name} (${dep.Location})`
                        }
                    })
                    this.setState({ departmentOptions: departments });
                }
            });

        url = `/api/Employees/SupervisorList/${this.id}`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    const employees = response.map((emp, index) => {
                        return {
                            value: emp.ID,
                            text: emp.Name
                        }
                    })
                    this.setState({
                        employeeOptions: employees
                    });
                }
            });

        if (this.id !== '') {
            url = `/api/Employees/${this.id}`
            WebApi(url, '', 'GET').then(response => {
                if (response) {
                    this.resiAddressId = response.ResidentialAddress
                    this.postAddressId = response.PostalAddress
                    this.setState({
                        fName: response.FirstName ?? '',
                        lName: response.LastName ?? '',
                        gender: response.Gender ?? '',
                        departmentId: response.Department ?? '',
                        jobTitle: response.JobTitle ?? '',
                        joiningDate: !IsNull(response.JoiningDate) ? new Date(response.JoiningDate) : null,
                        dateOfBirth: response.DateofBirth !== null ? new Date(`${response.DateofBirth}-${new Date().getFullYear()}`) : null,
                        mobile: response.Mobile ?? '',
                        phone: response.HomePhone ?? '',
                        linkedinProfile: response.ProfessionalProfile ?? '',
                        email: response.Email ?? '',
                        employmentType: response.EmploymentType ?? '',
                        eduQualification: response.EducationQualification ?? '',
                        identificationDocument: response.IdentificationDocument ?? '',
                        identificationNumber: response.IdentificationNumber ?? '',
                        employeeImage: response.EmployeeImage ?? '',
                        employeeID: response.EmployeeID ?? '',
                        isActive: response.IsActive ?? true,
                        employeeSupervisor: response.SupervisorID ?? ''
                    })
                    if (this.resiAddressId !== DefaultGuid) {
                        url = `/api/Address/${this.resiAddressId}`
                        WebApi(url, '', 'GET').then(response => {
                            if (response) {
                                this.setState({
                                    houseNumberResiAdd: response.HouseNumber ?? '',
                                    streetResiAdd: response.StreetAddress ?? '',
                                    suburbCityResiAdd: response.SuburbCity ?? '',
                                    stateResiAdd: response.State ?? '',
                                    postalCodeResiAdd: response.PostalCode ?? '',
                                }, () => {
                                    if (this.postAddressId !== DefaultGuid) {
                                        url = `/api/Address/${this.postAddressId}`
                                        WebApi(url, '', 'GET').then(response => {
                                            if (response) {
                                                this.setState({
                                                    houseNumberPostAdd: response.HouseNumber ?? '',
                                                    streetPostAdd: response.StreetAddress ?? '',
                                                    suburbCityPostAdd: response.SuburbCity ?? '',
                                                    statePostAdd: response.State ?? '',
                                                    postalCodePostAdd: response.PostalCode ?? '',
                                                }, () => {
                                                    if (this.state.houseNumberResiAdd === this.state.houseNumberPostAdd &&
                                                        this.state.streetResiAdd === this.state.streetPostAdd &&
                                                        this.state.suburbCityResiAdd === this.state.suburbCityPostAdd &&
                                                        this.state.stateResiAdd === this.state.statePostAdd &&
                                                        this.state.postalCodeResiAdd === this.state.postalCodePostAdd) {
                                                        this.setState({
                                                            sameResidentialAddress: true,
                                                            readOnly: true
                                                        })
                                                    }
                                                })
                                            }
                                        });
                                    }
                                })
                            }
                        });
                    }
                }
            });
        }
    }

    handleSubmit = () => {
        if (this.validate() === true) {
            let url = ''
            let data = ''
            url = !IsNull(this.resiAddressId) && this.resiAddressId !== DefaultGuid ? `/api/Address/${this.resiAddressId}` : `/api/Address/`
            data = JSON.stringify({
                "AddressId": !IsNull(this.resiAddressId) ? this.resiAddressId : `{${DefaultGuid}}`,
                "HouseNumber": this.state.houseNumberResiAdd,
                "StreetAddress": this.state.streetResiAdd,
                "SuburbCity": this.state.suburbCityResiAdd,
                "State": this.state.stateResiAdd,
                "PostalCode": this.state.postalCodeResiAdd,
                "IsPostalAddress": false,
            })
            WebApi(url, data, !IsNull(this.resiAddressId) && this.resiAddressId !== DefaultGuid ? 'PUT' : 'POST')
                .then(response => {
                    if (response) {
                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                            if (!IsNull(response.id)) {
                                this.resiAddressId = response.id
                            }
                            url = !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ? `/api/Address/${this.postAddressId}` : `/api/Address/`
                            data = JSON.stringify({
                                "AddressId": !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ? this.postAddressId : `{${DefaultGuid}}`,
                                "HouseNumber": this.state.houseNumberPostAdd,
                                "StreetAddress": this.state.streetPostAdd,
                                "SuburbCity": this.state.suburbCityPostAdd,
                                "State": this.state.statePostAdd,
                                "PostalCode": this.state.postalCodePostAdd,
                                "IsPostalAddress": true,
                            })
                            WebApi(url, data, !IsNull(this.postAddressId) && this.postAddressId !== DefaultGuid ? 'PUT' : 'POST')
                                .then(response => {
                                    if (response) {
                                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                                            if (!IsNull(response.id)) {
                                                this.postAddressId = response.id
                                            }
                                            url = !IsNull(this.id) ? `/api/Employees/${this.id}` : `/api/Employees/`
                                            data = JSON.stringify({
                                                "ID": !IsNull(this.id) ? this.id : 0,
                                                "FirstName": this.state.fName,
                                                "LastName": this.state.lName,
                                                "Gender": this.state.gender,
                                                "Department": this.state.departmentId,
                                                "JobTitle": this.state.jobTitle,
                                                "JoiningDate": this.state.joiningDate,
                                                "LeavingDate": this.state.leavingDate,
                                                "DateofBirth": this.getDOBInt(this.state.dateOfBirth),
                                                "Mobile": this.state.mobile,
                                                "HomePhone": this.state.phone,
                                                "Email": this.state.email,
                                                "ProfessionalProfile": this.state.linkedinProfile,
                                                "EmploymentType": this.state.employmentType,
                                                "EducationQualification": this.state.eduQualification,
                                                "IdentificationDocument": this.state.identificationDocument,
                                                "IdentificationNumber": this.state.identificationNumber,
                                                "ResidentialAddress": this.resiAddressId,
                                                "PostalAddress": this.postAddressId,
                                                "EmployeeImage": {
                                                    "Src": this.state.employeeImage !== '' ? this.state.employeeImage : '',
                                                    "Type": this.state.employeeImageType !== '' ? this.state.employeeImageType : '',
                                                    "UploadedName": this.state.employeeImageName !== '' ? this.state.employeeImageName : '',
                                                    "IsChanged": this.state.isEmployeeImageChanged
                                                },
                                                "SupervisorID": this.state.employeeSupervisor
                                            })
                                            WebApi(url, data, !IsNull(this.id) ? 'PUT' : 'POST')
                                                .then(response => {
                                                    if (response) {
                                                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                                                            this.setState({
                                                                isEmployeeImageChanged: false
                                                            })
                                                            AlertDialog('Employee data saved successfully.')
                                                        }
                                                    }
                                                })
                                        }
                                    }
                                })
                        }
                    }
                })
        }
    }

    getDOBInt = (dob) => {
        dob = dob.toString().replace("st", "").replace("nd", "").replace("rd", "").replace("th", "");
        const d = new Date(`${dob} ${new Date().getFullYear()}`)
        return `${(d.getMonth() + 1)
            .toLocaleString(Locale, { minimumIntegerDigits: 2, useGrouping: false })}-${d.getDate()
                .toLocaleString(Locale, { minimumIntegerDigits: 2, useGrouping: false })}`;
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
            { value: this.state.leavingDate, errorType: 'leavingDateError' }, { value: this.state.employeeSupervisor, errorType: 'employeeSupervisorError' }
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
                    this.setState({
                        emailErrorText: ''
                    })
                }
                else if (i.errorType === 'joiningDateError') { this.setState({ joiningDateErrorText: '' }) }
                else if (i.errorType === 'leavingDateError') { this.setState({ [i.errorType]: false, leavingDateErrorText: '' }); return true }
                else if (i.errorType === 'postalCodeResiAddError') { this.setState({ postalCodeResiAddErrorText: '' }) }
                else if (i.errorType === 'postalCodePostAddError') { this.setState({ postalCodePostAddErrorText: '' }) }
                if (this.state.sameResidentialAddress && (i.errorType === 'houseNumberPostAddError' || i.errorType === 'suburbCityPostAddError'
                    || i.errorType === 'statePostAddError' || i.errorType === 'postalCodePostAddError')) {
                    this.setState({
                        [i.errorType]: false
                    })
                    return true
                }
                this.setState({
                    [i.errorType]: true
                }); return false
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
        return this.props.navigate(-1)
    }

    handleActivateDeactivate = (action) => {
        let message = action ? 'Please confirm to activate the employee record?' :
            'Please confirm to delete the employee record?'
        let heading = action ? 'Confirm Activate' : 'Confirm Delete'
        let successMessage = action ? 'Employee record has been activated.' :
            'Employee record has been deleted.'
        ConfirmDialog(message, heading, () => {
            let url = `/api/Employees/${this.id}?action=${action}`
            WebApi(url, '', 'DELETE')
                .then(response => {
                    if (response) {
                        if (!IsNull(response.Message) && response.Message.toUpperCase() === "SUCCESS") {
                            this.setState({
                                isEmployeeImageChanged: false
                            })
                            AlertDialog(successMessage, () => {
                                this.setState({
                                    isActive: action
                                })
                            })
                        }
                    }
                })
        }, null);
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

    handleEmployeeImageUpload = (e) => {
        if (!IsNull(this.employeeImageInputRef.current.files)) {
            let _this = this
            let imagefileType = this.employeeImageInputRef.current.files[0].type;
            let imagefileName = this.employeeImageInputRef.current.files[0].name;
            let match = ["image/jpeg", "image/png", "image/jpg"];
            if (!match.some(x => x === imagefileType)) {
                AlertDialog("Invalid File Extension")
            } else {
                let fReader = new FileReader();
                fReader.readAsDataURL(this.employeeImageInputRef.current.files[0]);
                fReader.onloadend = function (event) {
                    _this.setState({
                        employeeImage: event.target.result,
                        employeeImageType: imagefileType,
                        employeeImageName: imagefileName,
                        isEmployeeImageChanged: true
                    })
                }
            }
        }
    }

    handleEmployeeImageClear = (e) => {
        if (e.target && e.target.parentNode && e.target.parentNode.classList.contains('removeEmployeeImage')) {
            this.setState({
                employeeImage: '',
                isEmployeeImageChanged: true
            })
        }
    }

    render() {
        const { location } = this.props;
        if (location && location.state)
            this.id = location.state
        const GenderOptions = [{ value: "Male", text: "Male" }, { value: "Female", text: "Female" }]
        const EmploymentTypes = [{ value: "FULL TIME", text: "Full Time" }, { value: "PART TIME", text: "Part Time" }, { value: "CASUAL", text: "Casual" },
        { value: "TEMPORARY", text: "Temporary" }]
        const IdentificationDocuments = [{ value: "Driver's Licence", text: "Driver's Licence" }, { value: "Passport", text: "Passport" },
        { value: "Birth Certificate", text: "Birth Certificate" }];
        const { fName, lName, gender, departmentId, jobTitle, employmentType, identificationNumber, identificationDocument, readOnly, dateOfBirth,
            phone, mobile, email, linkedinProfile, joiningDate, leavingDate, eduQualification, houseNumberResiAdd, streetResiAdd, suburbCityResiAdd,
            stateResiAdd, postalCodeResiAdd, houseNumberPostAdd, streetPostAdd, suburbCityPostAdd, statePostAdd, postalCodePostAdd, departmentOptions,
            sameResidentialAddress, fNameError, lNameError, departmentError, genderError, dateOfBirthError, joiningDateError, mobileError, identificationNumberError,
            phoneError, emailError, jobTitleError, eduQualificationError, employmentTypeError, identificationDocumentError, houseNumberResiAddError,
            suburbCityResiAddError, stateResiAddError, postalCodeResiAddError, houseNumberPostAddError, suburbCityPostAddError, statePostAddError,
            postalCodePostAddError, leavingDateError, phoneErrorText, mobileErrorText, emailErrorText, joiningDateErrorText, leavingDateErrorText,
            postalCodeResiAddErrorText, postalCodePostAddErrorText, employeeImage, employeeID, isActive, employeeOptions, employeeSupervisor, employeeSupervisorError } = this.state
        return (
            <div className="mx-0 px-0">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap m-0 p-0">
                            <div className="col-sm-6 m-0 p-0"><h2 className="p-0 m-0">Employee<b> Details</b></h2></div>
                            <div className="col-sm-6 m-0 p-0">
                                {this.id !== '' && isActive ? <button type="button" onClick={() => this.handleActivateDeactivate(false)} className="btn bg-danger add-new text-white px-3 p-0 m-0 my-1 ml-1">Deactivate</button> : ''}
                                {this.id !== '' && !isActive ? <button type="button" onClick={() => this.handleActivateDeactivate(true)} className="btn bg-warning add-new text-white px-3 p-0 m-0 my-1 ml-1">Reactivate</button> : ''}
                                {isActive ? <button type="button" onClick={() => this.handleSubmit()} className="btn btn-success add-new p-0 m-0 my-1 ml-1">Save</button> : ''}
                                <button type="button" onClick={this.handleBack} className="btn bg-dark add-new text-white p-0 m-0 my-1">Back</button>
                            </div>
                        </div>
                    </div>
                    {!isActive ? <div className="col-12 mb-4 alignCenter text-danger"><b>The employee has been de-activated.</b></div> : null}
                    <div>
                        <div className={"border p-4 pb-5" + (isActive ? "" : " disabled-inputs")}>
                            <form>
                                <div className="col-12 p-0 m-0 row">
                                    <div className="col-3 p-0  m-0">
                                        <div className="col-12 p-0  m-0">
                                            <div className="col-9 p-0  m-0">
                                                <IconButton className="removeEmployeeImageIconButton" onClick={this.handleEmployeeImageClear} disableRipple={true}>
                                                    {!IsNull(employeeImage) ? <i title="Remove Image">
                                                        <RemoveCircle className="removeEmployeeImage" />
                                                    </i> : null}
                                                    <div className="col-12 p-0  m-0 profileImageDiv">
                                                        <div className="col-12 p-0 m-0 alignCenter iconButtonProfileDiv">
                                                            <IconButton className="uploadPicture" aria-label="upload picture" component="label" disableRipple={true}>
                                                                <input hidden accept="image/*" type="file" ref={this.employeeImageInputRef} onChange={this.handleEmployeeImageUpload} />
                                                                <Avatar className="profileImage" alt={fName + ' ' + lName} ref={this.employeeImageRef} onChange={this.handleImageSrcChange}
                                                                    src={!IsNull(employeeImage) ? (employeeImage.startsWith('data:') ? employeeImage :
                                                                        (IsDev() ? LoadImage(employeeImage)
                                                                            : EmployeeFolder + employeeImage)) : profileImage} variant="rounded" />
                                                                <PhotoCamera />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                </IconButton>
                                            </div>
                                        </div>
                                        <div className="col-12 p-0">
                                            <div className="col-9 p-0 mt-4 m-0 alignCenter txt-center">
                                                <label style={{ fontWeight: 600 }} className="p-0 m-0">
                                                    {fName} {lName}
                                                </label>
                                            </div>
                                            <div className="col-9 p-0 mb-1 m-0 alignCenter txt-center">
                                                <p>{employeeID !== '' ? '(ID: ' + employeeID + ')' : ''}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-9 p-0">
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
                                                    <div className="iconLink"><a href={!IsNull(linkedinProfile) && linkedinProfile.indexOf('https:') === 0 ? linkedinProfile : 'https://' + linkedinProfile} target="_blank" rel="noreferrer" >
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
                                    <div className="col-12 p-0 m-0 mt-3 row">
                                        <div className="col-6 p-0">
                                            <div className="col-11 p-0">
                                                <div className="col-12 p-0">
                                                    <Input type="select" error={employeeSupervisorError} value={employeeSupervisor} labelId="employeeSupervisor"
                                                        label="Supervisor" options={employeeOptions} customClass="fullWidth"
                                                        onChange={(e) => { this.setState({ employeeSupervisor: e.target.value }) }} />
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
            </div>
        )
    }
}

export default AddEditEmployee