import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../css/Table.css';
import WebApi from '../Helpers/WebApi';

export class Employees extends Component {
    constructor(props) {
        super(props)

        this.state = {
            token: localStorage.getItem('myToken') || '',
            employeeData: [],
            keys: [],
            noOfPages: 0,
            firstRow: 0,
            totalRows: 0,
            currentPageRows: 10,
            pageRows: 10,
            lastPageRows: 10,
            activePage: 1
        }
    }

    componentDidMount = () => {
        let url = `/api/Employees`
        WebApi(url, '', 'GET')
            .then(response => {
                let totalRows = response.length
                let noOfPages = parseInt(totalRows / this.state.pageRows)
                let lastPageRows = parseInt(totalRows) % this.state.pageRows
                if (lastPageRows > 0)
                    noOfPages++;
                this.setState({
                    employeeData: response, keys: Object.keys(response[0]), noOfPages: noOfPages,
                    totalRows: totalRows, lastPageRows: lastPageRows
                })
            });
    }

    handleChangePage = (e, k) => {
        e.preventDefault();
        let pageRows = this.state.pageRows

        if (k === this.state.noOfPages)
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: this.state.lastPageRows, activePage: k })
        else
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: pageRows, activePage: k })
    }

    renderTableData = (first, count) => {
        if (typeof (this.state.employeeData) === 'object' && this.state.employeeData && this.state.employeeData.length) {
            return this.state.employeeData.slice(first, first + count).map((employee, index) => {
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
        else return null
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

    renderPagination = () => {
        let pagination = []

        for (let j = 1; j <= this.state.noOfPages; j++) {
            pagination.push(<li key={j} className={"page-item " + (this.state.activePage === j ? "active" : "")}>
                <a onClick={(e) => this.handleChangePage(e, j)} href='/' className="page-link">{j}</a>
            </li>)
        }
        return pagination
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
                        {this.renderTableData(this.state.firstRow, this.state.currentPageRows)}
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">Showing <b>{this.state.currentPageRows}</b> out of <b>{this.state.totalRows}</b> entries</div>
                    <ul className="pagination">
                        <li className="page-item disabled"><a href="#"><i className="fa fa-angle-double-left"></i></a></li>
                        {this.renderPagination()}
                        <li className="page-item"><a href="#" className="page-link"><i className="fa fa-angle-double-right"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>)
    }
}

export default Employees
