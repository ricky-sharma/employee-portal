import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import AlertMessage from '../../AlertMessage';
import WebApi from '../../Helpers/WebApi';

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
            salary: '',
            departmentId: '',
            jobTitle: '',
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
                const departments = response.map((dep, index) => <option key={index + 1} value={dep.ID}>{dep.Name} ({dep.Location}) </option>)
                this.setState({ departmentOptions: departments }, () => {
                });
            });

        if (this.id !== 0) {
            url = `/api/Employees/` + this.id
            WebApi(url, '', 'GET')
                .then(response => {
                    this.setState({
                        fName: response.FirstName, lName: response.LastName, gender: response.Gender, salary: response.Salary,
                        departmentId: response.DepartmentId, jobTitle: response.JobTitle
                    })
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
                "JobTitle": this.state.jobTitle
            })
            WebApi(url, data, 'PUT')
                .then(response => {
                    if (response.Message && response.Message.toUpperCase() === "SUCCESS")
                        this.setState({
                            showAlert: true, alertType: 'success', readOnly: true
                        })
                    else
                        return this.setState({ showAlert: true, alertType: "danger", message: "Some error occured, please try again." })
                });
        }
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render(props) {
        const IsLoggedIn = localStorage.getItem("myToken");
        if (!IsLoggedIn)
            return <Redirect to='/' />

        if (this.props.location && this.props.location.data && this.props.location.data.ID)
            this.id = this.props.location.data.ID

        const { fName, lName, gender, salary, departmentId, jobTitle, showAlert, alertType, message, readOnly } = this.state
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
            <div>
                <div className="container border">
                    <h4 className="mt-2 mb-5">
                        <b>Edit Employee</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-5">
                                <label>Employee name</label>
                            </div>
                            <label>{fName} {lName}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-5">
                                <label>Gender</label>
                            </div>
                            <label>{gender}</label>
                        </div>
                        <div className="row  p-2">
                            <div className="col-5">
                                <label>Salary</label>
                            </div>
                            <input className={(readOnly === true ? "disabled-inputs" : "")} value={salary} onChange={(e) => { this.setState({ salary: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-5">
                                <label>Department</label>
                            </div>
                            <select className={(readOnly === true ? "disabled-inputs" : "")} value={departmentId} onChange={(e) => { this.setState({ departmentId: e.target.value }) }}>
                                <option key="0" value="select">Select</option>{this.state.departmentOptions}
                            </select>
                        </div>
                        <div className="row  p-2">
                            <div className="col-5">
                                <label>Job Title</label>
                            </div>
                            <input className={(readOnly === true ? "disabled-inputs" : "")} value={jobTitle} onChange={(e) => { this.setState({ jobTitle: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-5"></div>
                            <input className="btn btn-success mr-1" value={(readOnly === true ? "Edit" : "Update")} onClick={() => this.handleSubmit()} type="button"></input>
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </div>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default EditEmployee
