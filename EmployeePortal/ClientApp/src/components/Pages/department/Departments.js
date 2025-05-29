import React, { useEffect, useState } from 'react';
import DataGrid, { trackPromise } from 'react-data-grid-lite';
import { Navigate } from "react-router-dom";
import { WebApi } from '../../helpers/WebApi.ts';

export function Departments() {
    const [departmentData, setDepartmentData] = useState([]);
    const [departmentColumns, setDepartmentColumns] = useState([]);
    const [addNewClicked, setAddNewClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [navigateState, setNavigateState] = useState('');

    useEffect(() => {
        let url = `/api/Departments`
        let webApiCall = WebApi(url, '', 'GET')
            .then(response => {
                if (response && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (
                            val.toUpperCase() === 'ID'
                            || val.toUpperCase() === 'DEPARTMENTADDRESS'
                            || val.toUpperCase() === 'POSTALADDRESS'
                        )
                            return {
                                name: val,
                                searchEnable: false,
                                hidden: true
                            }
                        else
                            return {
                                name: val
                            }
                    })
                    setDepartmentColumns(cols)
                    setDepartmentData(response)
                }
            });
        trackPromise(webApiCall)
    }, []);

    const handleAddDepartment = () => {
        setAddNewClicked(true)
    }

    const rowClicked = (e, row) => {
        setEditClicked(true);
        setNavigateState(row?.ID ?? '');
    }

    if (addNewClicked)
        return <Navigate to='/AddDepartment' />
    else if (editClicked)
        return <Navigate to='/EditDepartment' state={navigateState} />
    let options = { EnableColumnSearch: true, EnableGlobalSearch: true }

    return (
        <div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0">
                            <h2 className="p-0 m-0">
                                Department <b>Details</b>
                            </h2>
                        </div>
                        <div className="col-sm-4 p-0 m-0">
                            <button
                                type="button"
                                onClick={handleAddDepartment}
                                className="btn btn-success add-new">
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <DataGrid
                        columns={departmentColumns}
                        data={departmentData}
                        pageSize={15}
                        options={options}
                        height={"500px"}
                        width={"inherit"}
                        onRowClick={rowClicked}
                    />
                </div>
            </div>
        </div>
    )
}

export default Departments
