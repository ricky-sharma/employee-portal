import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { DataGrid } from '../../Core/DataGrid';
import { WebApi } from '../../Helpers/WebApi.ts';

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeData: [],
            employeeColumns: [],
            key: 0
        }
    }

    componentWillMount = () => {
        let url = `/api/Employees`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    let Columns = Object.keys(response[0])
                    let cols = []
                    Columns.map((val) => {
                        if (val.toUpperCase() === 'ID')
                            cols.push({
                                Name: val,
                                SearchEnable: false,
                                cssClass: 'col1width75'
                            })
                        else if (val.toUpperCase() === 'JOININGDATE')
                            cols.push({
                                Name: val,
                                Alias: 'Joining Date',
                                Formatting: {
                                    Type: 'Date', Format: 'dd MMM yyyy'
                                }
                            })
                        else if (val.toUpperCase() === 'EMPLOYMENTTYPE')
                            cols.push({
                                Name: val,
                                Alias: 'Employment Type',
                            })
                        else if (val.toUpperCase() === 'JOBTITLE')
                            cols.push({
                                Name: val,
                                Alias: 'Job Title',
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

                        this.setState({
                            employeeData: response,
                            employeeColumns: cols,
                            key: Math.random()
                        })
                    })
                }
            });
    }

    handleAddEmployee = () => {
        this.props.history.push('/AddEmployee')
    }

    rowClicked = (e, row) => {
        this.props.history.push({ pathname: '/EditEmployee', state: row.ID })
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<Container className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0"><h2>Manage <b>Employees</b></h2></div>
                        <div className="col-sm-4">
                            <button type="button" onClick={this.handleAddEmployee} className="btn btn-success add-new">Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid key={this.state.key} Columns={this.state.employeeColumns} RowsData={this.state.employeeData}
                        Options={options} PageRows={10} GridEvents={gridEvents} />
                </div>
            </div>
        </Container>)
    }
}

export default Employees
