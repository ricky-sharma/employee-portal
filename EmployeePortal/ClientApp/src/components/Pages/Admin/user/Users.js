import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import { DataGrid } from '../../../Core/DataGrid';
import { WebApi } from '../../../helpers/WebApi.ts';

export class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            userColumns: [],
            addNewClicked: false,
            editClicked: false,
            resetPasswordClicked: false,
            navigateState: ''
        }
    }

    componentDidMount = () => {
        let url = `/api/AspNetUserInfoes`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response != null && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (val.toUpperCase() === 'ID' || val.toUpperCase() === 'DOB' || val.toUpperCase() === 'GENDER'
                            || val.toUpperCase() === 'USERID' || val.toUpperCase() === 'USERINFOVIEWMODEL')
                            return {
                                Hidden: true
                            }
                        else if (val.toUpperCase() === 'FIRSTNAME')
                            return {
                                Name: val,
                                Alias: 'Name',
                                ConcatColumns: {
                                    Columns: ['FIRSTNAME', 'LASTNAME']
                                }
                            }
                        else if (val.toUpperCase() === 'LASTNAME')
                            return {
                                Name: val,
                                Hidden: true
                            }
                        else
                            return { Name: val }
                    })
                    this.setState({
                        userData: response,
                        userColumns: cols
                    })

                }
            });
    }

    handleAddUser = () => {
        this.setState({ addNewClicked: true })
    }

    rowClicked = (e, row) => {
        this.setState({ editClicked: true, navigateState: row.UserId })
    }

    Type1ButtonClicked = (e, row) => {
        this.setState({ resetPasswordClicked: true, navigateState: row.UserId })
    }

    render() {
        if (this.state.addNewClicked)
            return <Navigate to='/CreateUser' />
        else if (this.state.editClicked)
            return <Navigate to='/EditUser' state={this.state.navigateState} />
        else if (this.state.resetPasswordClicked)
            return <Navigate to='/ResetPassword' state={this.state.navigateState} />

        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { Type1Button: { Event: this.Type1ButtonClicked }, EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Application <b>Users</b></h2></div>
                        <div className="col-sm-4 p-0 m-0">
                            <button type="button" onClick={this.handleAddUser} className="btn btn-success add-new">Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid Columns={this.state.userColumns} RowsData={this.state.userData} PageRows={15}
                        GridEvents={gridEvents} Options={options} />
                </div>
            </div>
        </div>)
    }
}

export default Users
