import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Table.css';
import WebApi from '../../Helpers/WebApi';
import { format } from "date-fns";
import { Container } from 'reactstrap';

export class Employees extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
                let noOfPages = parseInt(totalRows / this.state.pageRows, 10)
                let lastPageRows = parseInt(totalRows % this.state.pageRows, 10)
                if (lastPageRows > 0)
                    noOfPages++;
                this.setState({
                    employeeData: response, keys: Object.keys(response[0]), noOfPages: noOfPages,
                    totalRows: totalRows, lastPageRows: lastPageRows
                })
            });
    }

    renderTableData = (first, count) => {
        if (typeof (this.state.employeeData) === 'object' && this.state.employeeData && this.state.employeeData.length) {
            return this.state.employeeData.slice(first, first + count).map((employee, index) => {
                const { ID, FirstName, LastName, Gender, DepartmentName, DepartmentLocation, JobTitle, JoiningDate, InService } = employee //destructuring
                return (
                    <tr key={index}>
                        <td>{ID}</td>
                        <td>{FirstName + " " + LastName}</td>
                        <td>{Gender}</td>
                        <td>{DepartmentName}</td>
                        <td>{DepartmentLocation}</td>
                        <td>{JoiningDate !== null ? format(new Date(JoiningDate), "dd MMM yyyy") : ''}</td>
                        <td>{InService === true ? "Yes" : "No"}</td>
                        <td>{JobTitle}</td>
                        <td>
                            <Link className="edit" title="Edit" to={{
                                pathname: '/EditEmployee',
                                data: { ID }
                            }} data-toggle="tooltip">
                                <i className="material-icons">&#xE254;</i>
                            </Link>
                        </td>
                    </tr>
                )
            })
        }
        else return null
    }

    renderTableHeader = () => {
        let header = this.state.keys
        console.log(header)
        if (header[header.length - 1] === '') {
            header.pop()
        }
        header.push(...[''])
        return header.map((key, index) => {
            if (key === '')
                return <th key={index}></th>
            if (key.toUpperCase() === 'ID')
                return <th className="col1width15" key={index}>ID</th>
            if (key.toUpperCase() === "DEPARTMENTNAME")
                return <th key={index}>DEPARTMENT</th>
            if (key.toUpperCase() === "DEPARTMENTLOCATION")
                return <th key={index}>LOCATION</th>
            if (key.toUpperCase() !== "FIRSTNAME" && key.toUpperCase() !== "LASTNAME" && key.toUpperCase() !== "DEPARTMENTID" && key.toUpperCase() !== "SALARY" && key.toUpperCase() !== "LEAVINGDATE")
                return <th key={index}>{key.toUpperCase()}</th>
            if (key.toUpperCase() === "FIRSTNAME")
                return <th key={index}>NAME</th>
            return null
        })
    }

    handleChangePage = (e, k) => {
        e.preventDefault();
        let pageRows = this.state.pageRows

        if (k === this.state.noOfPages)
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: this.state.lastPageRows, activePage: k })
        else
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: pageRows, activePage: k })
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

    handleForwardPage = (e) => {
        e.preventDefault();
        e.persist();
        if (this.state.activePage !== this.state.noOfPages) {
            this.setState((prevState) => ({ activePage: prevState.activePage + 1 }), () => {
                this.handleChangePage(e, this.state.activePage)
            })
        }
    }

    handleBackwardPage = (e) => {
        e.preventDefault();
        e.persist();
        if (this.state.activePage !== 1) {
            this.setState((prevState) => ({ activePage: prevState.activePage - 1 }), () => {
                this.handleChangePage(e, this.state.activePage)
            })
        }
    }

    handleAddEmployee = () => {
        this.props.history.push('/AddEmployee')
    }

    render() {
        const { totalRows, currentPageRows, firstRow, activePage, noOfPages } = this.state

        return (<Container>
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap">
                        <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={this.handleAddEmployee} className="btn btn-success add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <table className="table table-striped table-hover table-bordered border-0 tablemobile">
                    <thead>
                        <tr className="bg-secondary">
                            {this.renderTableHeader()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTableData(firstRow, currentPageRows)}
                    </tbody>
                </table>
                <div className="clearfix">
                    <div className="hint-text">Showing <b>{totalRows > currentPageRows ? currentPageRows : totalRows}</b> out of <b>{totalRows}</b> entries</div>
                    <ul className="pagination">
                        <li className={"page-item " + (activePage === 1 ? "disabled" : "")}>
                            <a onClick={(e) => this.handleBackwardPage(e)} href="/" className="page-link">
                                <i className="fa fa-angle-double-left"></i>
                            </a>
                        </li>
                        {this.renderPagination()}
                        <li className={"page-item " + (activePage === noOfPages ? "disabled" : "")}>
                            <a onClick={(e) => this.handleForwardPage(e)} href="/" className="page-link">
                                <i className="fa fa-angle-double-right"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </Container>)
    }
}

export default Employees
