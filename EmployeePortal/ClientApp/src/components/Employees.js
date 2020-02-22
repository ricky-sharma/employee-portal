import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './css/Table.css'

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
                console.log("res:" + res)
                return res.json();
            } else {
                throw Error(res.statusText);
            }
        }).then(json => {
            this.setState({ employeeData: json, keys: Object.keys(json[0]) }, () => {
                console.log("employeeData:" + this.state.employeeData)
            })

        }).catch(error => console.error(error));
    }
    renderTableData = () => {
        return this.state.employeeData.map((employee, index) => {
            const { ID, FirstName, LastName, Gender, Salary, Department, Location, JobTitle } = employee //destructuring
            return (
                <tr key={index}>
                    <td>{ID}</td>
                    <td>{FirstName + " " + LastName}</td>
                    <td>{Gender}</td>
                    <td>{Salary}</td>
                    <td>{Department}</td>
                    <td>{Location}</td>
                    <td>{JobTitle}</td>
                    <td>                        
                        <a class="edit" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>                       
                    </td>
                </tr>
            )
        })
    }

    renderTableHeader = () => {
        let header = this.state.keys
        header.push(...[''])
        console.log("header:" + header)
        return header.map((key, index) => {console.log(key)
            if(key==='')
            {
                return <th key={index}></th>
            }
            if (key.toUpperCase() !== "FIRSTNAME" && key.toUpperCase() !== "LASTNAME") {
                
                return <th key={index}>{key.toUpperCase()}</th>
            }
            else if (key.toUpperCase() === "FIRSTNAME")
                return <th key={index}>NAME</th>
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
                <div class="table-title">
                    <div class="row">
                        <div class="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                        <div class="col-sm-4">
                            <button type="button" onClick={this.handleAddEmployee} class="btn btn-success add-new"><i class="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <table class="table table-striped table-hover table-bordered border-0">
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
