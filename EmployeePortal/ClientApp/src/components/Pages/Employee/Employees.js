import React, { Component } from 'react';
import '../../css/Table.css';
import WebApi from '../../Helpers/WebApi';
import { format } from "date-fns";
import { Container } from 'reactstrap';
import { DataGrid } from '../../Core/DataGrid';

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            emData: [],
            empColumns: [],
            empFormatColumns: [],
            key: 0
        }
    }

    componentWillMount = () => {
        let url = `/api/Employees`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    this.setState({
                        empColumns: Object.keys(response[0])
                    }, () => {
                        let cols = []
                        this.state.empColumns.map((val) => {
                            if (val.toUpperCase() === 'DEPARTMENTNAME')
                                cols.push({
                                    Name: val,
                                    Alias: 'Department'
                                })
                            else if (val.toUpperCase() === 'DEPARTMENTLOCATION')
                                cols.push({
                                    Name: val,
                                    Alias: 'Location'
                                })
                            else if (val.toUpperCase() === 'FIRSTNAME')
                                cols.push({
                                    Name: val,
                                    Alias: 'Name'
                                })
                            else if (val.toUpperCase() === 'DEPARTMENTID' || val.toUpperCase() === 'LEAVINGDATE'
                                || val.toUpperCase() === 'INSERVICE' || val.toUpperCase() === 'LASTNAME')
                                cols.push({
                                    Name: val,
                                    Hidden: true
                                })
                            else
                                cols.push({ Name: val })
                        })
                        this.setState({
                            emData: response,
                            empFormatColumns: cols,
                            key: Math.random()
                        })
                    })
                }
            });
    }

    handleAddEmployee = () => {
        this.props.history.push('/AddEmployee')
    }

    rowClicked = (row, e) => {
        this.props.history.push({ pathname: '/EditEmployee', state: row.ID })
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        return (<Container className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8"><h2>Employee <b>Details</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={this.handleAddEmployee} className="btn btn-success add-new"><i className="fa fa-plus"></i> Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid key={this.state.key} Columns={this.state.empFormatColumns} RowsData={this.state.emData} PageRows={15} GridEvents={gridEvents} />
                </div>
            </div>
        </Container>)
    }
}

export default Employees
