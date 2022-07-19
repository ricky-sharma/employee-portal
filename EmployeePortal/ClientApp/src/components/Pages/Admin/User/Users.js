import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { DataGrid } from '../../../Core/DataGrid';
import '../../../css/Table.css';
import WebApi from '../../../Helpers/WebApi';

export class Users extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userData: [],
            userColumns: [],
            key: 0

        }
    }

    componentDidMount = () => {
        let url = `/api/AspNetUserInfoes`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response != null) {
                    let Columns = Object.keys(response[0])
                    let cols = []
                    Columns.map((val) => {
                        if (val.toUpperCase() === 'ID' || val.toUpperCase() === 'DOB' || val.toUpperCase() === 'GENDER'
                            || val.toUpperCase() === 'USERID' || val.toUpperCase() === 'USERINFOVIEWMODEL')
                            cols.push({
                                Hidden: true
                            })
                        else if (val.toUpperCase() === 'FIRSTNAME')
                            cols.push({
                                Name: val,
                                Alias: 'Name',
                                ConcatColumns: {
                                    Columns: ['FIRSTNAME', 'LASTNAME']
                                }
                            })
                        else if (val.toUpperCase() === 'LASTNAME')
                            cols.push({
                                Name: val,
                                Hidden: true
                            })
                        else
                            cols.push({ Name: val })
                    })
                    this.setState({
                        userData: response,
                        userColumns: cols,
                        key: Math.random()
                    })

                }
            });
    }

    handleAddUser = () => {
        this.props.history.push('/CreateUser')
    }

    rowClicked = (e, row) => {
        this.props.history.push({ pathname: '/EditUserProfile', state: row.UsersId })
    }

    Type1ButtonClicked = (e, row) => {
        this.props.history.push({ pathname: '/ResetPassword', state: row.UsersId })
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { Type1Button: { Event: this.Type1ButtonClicked }, EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<Container className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8"><h2>Users <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={this.handleAddUser} className="btn btn-success add-new">Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid key={this.state.key} Columns={this.state.userColumns} RowsData={this.state.userData} PageRows={15}
                        GridEvents={gridEvents} Options={options} />
                </div>
            </div>
        </Container>)
    }
}

export default Users
