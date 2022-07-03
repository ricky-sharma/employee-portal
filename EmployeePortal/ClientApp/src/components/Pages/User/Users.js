import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../css/Table.css';
import WebApi from '../../Helpers/WebApi';
import moment from 'moment';

export class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userData: [],
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
        let url = `/api/AspNetUserInfoes`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response != null) {
                    let totalRows = response.length
                    let noOfPages = parseInt(totalRows / this.state.pageRows, 10)
                    let lastPageRows = parseInt(totalRows % this.state.pageRows, 10)
                    if (lastPageRows > 0)
                        noOfPages++;
                    this.setState({
                        userData: response, keys: Object.keys(response[0]), noOfPages: noOfPages,
                        totalRows: totalRows, lastPageRows: lastPageRows
                    })
                }
            });
    }

    renderTableData = (first, count) => {
        if (typeof (this.state.userData) === 'object' && this.state.userData && this.state.userData.length) {
            return this.state.userData.slice(first, first + count).map((user, index) => {
                const { FirstName, LastName, Gender, DOB, Email, UsersId } = user //destructuring
                return (
                    <tr key={index}>
                        <td>{FirstName + " " + LastName}</td>
                        <td>{Gender}</td>
                        <td>{DOB != null ? moment(DOB).format('DD-MMM-YYYY') : ''}</td>
                        <td>{Email}</td>
                        <td className="customWidth100">
                            <Link className="edit" title="Edit" to={{
                                pathname: '/EditUserProfile',
                                data: { UsersId }
                            }} data-toggle="tooltip">
                                <i className="material-icons">&#xE254;</i>
                            </Link>{'  '}
                            <Link className="changePassword" title="Change Password" to={{
                                pathname: '/ResetPassword',
                                data: { UsersId }
                            }} data-toggle="tooltip">
                                <i className="material-icons">vpn_key</i>
                            </Link>
                        </td>
                    </tr>
                )
            })
        }
        else return null
    }

    renderTableHeader() {
        let header = this.state.keys
        if (header[header.length - 1] === '') {
            header.pop()
        }
        header.push(...[''])
        return header.map((key, index) => {
            if (key === '') {
                return <th key={index}></th>
            }
            if (key.toUpperCase() !== "FIRSTNAME" && key.toUpperCase() !== "LASTNAME" && key.toUpperCase() !== "USERINFOVIEWMODEL" && key.toUpperCase() !== "USERSID" && key.toUpperCase() !== "ID")
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

    handleAddUser = () => {
        this.props.history.push('/CreateUser')
    }

    render() {
        const { totalRows, currentPageRows, firstRow, activePage, noOfPages } = this.state

        return (
            <div className="container">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap">
                            <div className="col-sm-8"><h2>Users <b>Detail</b></h2></div>
                            <div className="col-sm-4">
                                <button type="button" onClick={this.handleAddUser} className="btn btn-success add-new">
                                    <i className="fa fa-plus"></i> Add New
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered tablemobileoverflowx">
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
            </div>)
    }
}

export default Users
