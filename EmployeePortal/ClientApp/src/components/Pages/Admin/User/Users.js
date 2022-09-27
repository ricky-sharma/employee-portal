import React, { Component } from 'react';
import { DataGrid } from '../../../Core/DataGrid';
import { WebApi } from '../../../Helpers/WebApi.ts';

export class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            userColumns: []
        }
    }

    componentDidMount = () => {
        let url = `/api/AspNetUserInfoes`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response != null) {
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
        this.props.history.push('/CreateUser')
    }

    rowClicked = (e, row) => {
        this.props.history.push({ pathname: '/EditUserProfile', state: row.UserId })
    }

    Type1ButtonClicked = (e, row) => {
        this.props.history.push({ pathname: '/ResetPassword', state: row.UserId })
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { Type1Button: { Event: this.Type1ButtonClicked }, EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Users <b>Details</b></h2></div>
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
