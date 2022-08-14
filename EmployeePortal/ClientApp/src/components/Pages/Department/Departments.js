import React, { Component } from 'react';
import { DataGrid } from '../../Core/DataGrid';
import { WebApi } from '../../Helpers/WebApi.ts';

export class Departments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            departmentData: [],
            departmentColumns: []
        }
    }

    componentWillMount = () => {
        let url = `/api/Departments`
        WebApi(url, '', 'GET')
            .then(response => {
                if (response) {
                    let Columns = Object.keys(response[0])
                    let cols = []
                    Columns.map((val) => {
                        if (val.toUpperCase() === 'ID')
                            cols.push({
                                Name: val,
                                SearchEnable: false
                            })
                        else
                            cols.push({ Name: val })

                        this.setState({
                            departmentData: response,
                            departmentColumns: cols
                        })
                    })
                }
            });
    }

    handleAddDepartment = () => {
        this.props.history.push('/AddDepartment')
    }

    rowClicked = (e, row) => {
        this.props.history.push({ pathname: '/EditDepartment', state: row.ID })
    }

    render() {
        let gridEvents = { OnRowClick: this.rowClicked }
        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        return (<div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8"><h2>Department <b>Details</b></h2></div>
                        <div className="col-sm-4">
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
