import React, { Component } from 'react';
import AlertMessage from '../../AlertMessage';
import WebApi from '../../Helpers/WebApi';
import { Container } from 'reactstrap';

export class AddEmployee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            token: localStorage.getItem('myToken') || '',
            showAlert: false,
            alertType: '',
            departmentOptions: [],
            fName: '',
            lName: '',
            gender: '',
            salary: '',
            departmentId: '',
            jobTitle: '',
        }
    }

    componentDidMount = () => {
        let url = `/api/Departments`
        WebApi(url, '', 'GET')
            .then(response => {
                const departments = response.map((dep, index) => <option key={index + 1} value={dep.ID}>{dep.Name}
                    ({dep.Location}) </option>)
                this.setState({ departmentOptions: departments }, () => {
                });
            });
    }

    handleSubmit = () => {
        if (this.state.fName === '' || this.state.lName === '' || this.state.DepartmentId === 'select'
            || this.state.gender === 'select' || this.state.salary === '' || this.state.jobTitle === '') {
            return this.setState({ showAlert: true, alertType: "danger" })
        }
        let url = `/api/Employees`
        let data = JSON.stringify({
            "ID": 0,
            "DepartmentId": this.state.departmentId,
            "FirstName": this.state.fName,
            "LastName": this.state.lName,
            "Gender": this.state.gender,
            "Salary": this.state.salary,
            "JobTitle": this.state.jobTitle,                        
        })
        WebApi(url, data, 'POST')
            .then(response => {
                console.log(response)
                this.setState({
                    showAlert: true, alertType: 'success', departmentId: 'select',
                    fName: '', lName: '', gender: '', salary: '', jobTitle: ''
                })
            });
    }

    handleBack = () => {
        return this.props.history.goBack()
    }

    render() {
        const GenderOptions = [<option key="1" value="Male">Male</option>,
        <option key="2" value="Female">Female</option>];
        const { fName, lName, gender, salary, departmentId, jobTitle, showAlert, alertType } = this.state
        const SuccessMessage = "Employee has been added successfully."
        const ErrorMessage = "Please fill in all required fields."
        let Message
        if (alertType === "success")
            Message = SuccessMessage
        else if (alertType === "danger")
            Message = ErrorMessage

        return (
            <div>
                <Container className="border">
                    <h4 className="mt-2 mb-5">
                        <b>Add - Employee</b>
                    </h4>
                    <form>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>First name</label>
                            </div>
                            <input type="text" value={fName} onChange={(e) => { this.setState({ fName: e.target.value }) }}></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Last name</label>
                            </div>
                            <input type="text" value={lName} onChange={(e) => { this.setState({ lName: e.target.value }) }}></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Gender</label>
                            </div>
                            <select value={gender} onChange={(e) => { this.setState({ gender: e.target.value }) }}>
                                <option key="0" value="select">Select</option>{GenderOptions}
                            </select>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Salary</label>
                            </div>
                            <input value={salary} onChange={(e) => { this.setState({ salary: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Department</label>
                            </div>
                            <select value={departmentId} onChange={(e) => { this.setState({ departmentId: e.target.value }) }}>
                                <option key="0" value="select">Select</option>{this.state.departmentOptions}
                            </select>
                        </div>
                        <div className="row  p-2">
                            <div className="col-4">
                                <label>Job Title</label>
                            </div>
                            <input value={jobTitle} onChange={(e) => { this.setState({ jobTitle: e.target.value }) }} type="text"></input>
                        </div>
                        <div className="row p-2">
                            <div className="col-4"></div>
                            <input className="btn btn-success mr-1" value="Save" onClick={this.handleSubmit} type="button"></input>
                            <input className="mr-lg-1 btn bg-dark text-white btn-md" onClick={this.handleBack} type="button" value="Back" />
                        </div>
                    </form>
                </Container>
                <AlertMessage message={Message} visible={showAlert} type={alertType}></AlertMessage>
            </div>
        )
    }
}

export default AddEmployee
