import React, { Component } from 'react';
import { DataGrid } from '../../Core/DataGrid';
import { WebApi } from '../../Helpers/WebApi.ts';
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

export class Departments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departmentData: [],
            departmentColumns: []
        }
    }

    componentDidMount = () => {
        let url = `/api/Departments`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (val.toUpperCase() === 'ID')
                            return {
                                Name: val,
                                SearchEnable: false,
                                Hidden: true
                            }
                        else
                            return { Name: val }
                    })

                    this.setState({
                        departmentData: response,
                        departmentColumns: cols
                    })
                }
            });
    }

    handleAddDepartment = () => {
        history.push('/AddDepartment')
        history.go(0)
    }

    rowClicked = (e, row) => {
        history.push('/EditDepartment', row.ID )
        history.go(0)
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Department <b>Details</b></h2></div>
                        <div className="col-sm-4 p-0 m-0">
                            <button type="button" onClick={this.handleAddDepartment} className="btn btn-success add-new">Add New</button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid Columns={this.state.departmentColumns} RowsData={this.state.departmentData}
                        Options={options} PageRows={15} GridEvents={gridEvents} />
                </div>
            </div>
        </div>)
    }
}

export default Departments
