import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import '../css/Table.css'

export class Employees extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('myToken') || '',
            employeeData: [],
            keys: []
        }
    }

    componentDidMount = () => {
        fetch('http://employee.service.com/api/Employees', {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Authorization": 'Bearer ' + this.state.token
            },

        }).then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        }).then(json => {
            this.setState({ employeeData: json, keys: Object.keys(json[0]) })
        }).catch(error => console.error(error));
    }
    renderTableData = () => {
        return this.state.employeeData.map((employee, index) => {
            const { ID, FirstName, LastName, Gender, Salary, DepartmentName, DepartmentLocation, JobTitle } = employee //destructuring
            return (
                <tr key={index}>
                    <td>{ID}</td>
                    <td>{FirstName + " " + LastName}</td>
                    <td>{Gender}</td>
                    <td>{Salary}</td>
                    <td>{DepartmentName}</td>
                    <td>{DepartmentLocation}</td>
                    <td>{JobTitle}</td>
                    <td>
                        <a className="edit" title="Edit" data-toggle="tooltip"><i className="material-icons">&#xE254;</i></a>
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader = () => {
        let header = this.state.keys
        if (header[header.length - 1] === '') {
            header.pop()
        }
        header.push(...[''])
        return header.map((key, index) => {
            if (key === '')
                return <th key={index}></th>
            if (key.toUpperCase() === "DEPARTMENTNAME")
                return <th key={index}>DEPARTMENT</th>
            if (key.toUpperCase() === "DEPARTMENTLOCATION")
                return <th key={index}>LOCATION</th>
            if (key.toUpperCase() !== "FIRSTNAME" && key.toUpperCase() !== "LASTNAME" && key.toUpperCase() !== "DEPARTMENTID")
                return <th key={index}>{key.toUpperCase()}</th>
            if (key.toUpperCase() === "FIRSTNAME")
                return <th key={index}>NAME</th>
            return null
        })
    }

    handleAddEmployee = () => {
        this.props.history.push('/AddEmployee')
    }

    render() {
        const isLoggedIn = localStorage.getItem("myToken");
        if (!isLoggedIn)
            return <Redirect to='/' />

        return (<div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={this.handleAddEmployee} className="btn btn-success add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover table-bordered border-0">
                    <thead>
                        <tr className="bg-secondary">
                            {this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData()}
                    </tbody>
                </table>
                <div className="d-none clearfix">
                    <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                        <li className="page-item"><a href="#" className="page-link">1</a></li>
                        <li className="page-item"><a href="#" className="page-link">2</a></li>
                        <li className="page-item active"><a href="#" className="page-link">3</a></li>
                        <li className="page-item"><a href="#" className="page-link">4</a></li>
                        <li className="page-item"><a href="#" className="page-link">5</a></li>
                        <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>)
    }
}

export default Employees
