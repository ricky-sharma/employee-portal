import React, { Component } from 'react';
import { DataGrid } from '../../Core/DataGrid';
import { WebApi } from '../../Helpers/WebApi.ts';
import IsNull from '../../Common/Common';

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeData: [],
            employeeColumns: []
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
                        if (val.toUpperCase() === 'EMPLOYEEID')
                            cols.push({
                                Name: val,
                                Alias: 'ID',
                                SearchEnable: true,
                                cssClass: 'col1width125'
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
                                cssClass: 'nameColumn',
                                ConcatColumns: {
                                    Columns: ['FIRSTNAME', 'LASTNAME']
                                }
                            })
                        else if (val.toUpperCase() === 'LASTNAME' || val.toUpperCase() === 'EMPLOYEEIMAGE' || val.toUpperCase() === 'ID')
                            cols.push({
                                Name: val,
                                Hidden: true
                            })
                        else
                            cols.push({ Name: val })

                        this.setState({
                            employeeData: response,
                            employeeColumns: cols
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

    rowHover = (e, row) => {
        if (!IsNull(row.EmployeeImage) && e.target.classList.contains('nameColumn')) {
            let overlayDiv = document.createElement('div')
            overlayDiv.classList.add("overlayRowDiv")
            overlayDiv.style.cssText += "padding: 4px !important;"
            overlayDiv.innerHTML = "<img class='overlayRowDivImage'  src=" + require('../../../../../files/employeeImages/' + row.EmployeeImage) + " />"
            e.target.appendChild(overlayDiv)
        }
    }

    rowOut = (e, row) => {
        document.querySelectorAll('.overlayRowDiv').forEach(i => {
            if (i.parentNode === e.target)
                i.remove();
        });
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked, OnRowHover: this.rowHover, OnRowOut: this.rowOut }
        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Manage <b>Employees</b></h2></div>
                        <div className="col-sm-4 p-0 m-0">
                            <button type="button" onClick={this.handleAddEmployee} className="btn btn-success add-new">Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid Columns={this.state.employeeColumns} RowsData={this.state.employeeData}
                        Options={options} PageRows={10} GridEvents={gridEvents} />
                </div>
            </div>
        </div>)
    }
}

export default Employees
