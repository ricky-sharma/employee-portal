import React, { Component } from 'react';
import { EmployeeFolder } from '../../../Constants';
import IsNull, { IsDev } from '../../common/Common';
import { DataGrid } from '../../Core/DataGrid';
import { LoadImage } from '../../helpers/ImageHelper';
import { WebApi } from '../../helpers/WebApi.ts';

export class Employees extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employeeData: [],
            employeeColumns: []
        }
    }

    componentDidMount = () => {
        let url = `/api/Employees`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (val.toUpperCase() === 'EMPLOYEEID')
                            return {
                                Name: val,
                                Alias: 'ID',
                                SearchEnable: true,
                                cssClass: 'col1width125'
                            }
                        else if (val.toUpperCase() === 'JOININGDATE')
                            return {
                                Name: val,
                                Alias: 'Joining Date',
                                Formatting: {
                                    Type: 'Date', Format: 'dd MMM yyyy'
                                }
                            }
                        else if (val.toUpperCase() === 'EMPLOYMENTTYPE')
                            return {
                                Name: val,
                                Alias: 'Employment Type',
                            }
                        else if (val.toUpperCase() === 'JOBTITLE')
                            return {
                                Name: val,
                                Alias: 'Job Title',
                            }
                        else if (val.toUpperCase() === 'FIRSTNAME')
                            return {
                                Name: val,
                                Alias: 'Name',
                                cssClass: 'nameColumn',
                                ConcatColumns: {
                                    Columns: ['FIRSTNAME', 'LASTNAME']
                                }
                            }
                        else if (val.toUpperCase() === 'LASTNAME' || val.toUpperCase() === 'EMPLOYEEIMAGE' || val.toUpperCase() === 'ID')
                            return {
                                Name: val,
                                Hidden: true
                            }
                        else
                            return { Name: val }
                    })
                    this.setState({
                        employeeData: response,
                        employeeColumns: cols
                    })
                }
            });
    }

    handleAddEmployee = () => {
        this.props.navigate('/AddEmployee')
    }

    rowClicked = (e, row) => {
        this.props.navigate('/EditEmployee', { state: row.ID })
    }

    rowHover = (e, row) => {
        if (!IsNull(row.EmployeeImage) && e.target.classList.contains('nameColumn')) {
            let overlayDiv = document.createElement('div')
            overlayDiv.classList.add("overlayRowDiv")
            overlayDiv.style.cssText += "padding: 2px !important;"
            overlayDiv.innerHTML = "<img class='overlayRowDivImage'  src=" + (IsDev() ? LoadImage(row.EmployeeImage)
                : EmployeeFolder + row.EmployeeImage) + " />"
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
                        Options={options} PageRows={15} GridEvents={gridEvents} Height={"500px"} />
                </div>
            </div>
        </div>)
    }
}

export default Employees
