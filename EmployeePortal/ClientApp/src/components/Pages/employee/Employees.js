import React, { useEffect, useState } from 'react';
import DataGrid, { trackPromise } from 'react-data-grid-lite';
import { EmployeeFolder } from '../../../Constants';
import IsNull, { IsDev } from '../../common/Common';
import { LoadImage } from '../../helpers/ImageHelper';
import { WebApi } from '../../helpers/WebApi.ts';
import { useNavigate } from 'react-router-dom';

export function Employees() {
    let navigate = useNavigate();
    const [employeeData, setEmployeeData] = useState([]);
    const [employeeColumns, setEmployeeColumns] = useState([]);

    useEffect(() => {
        let url = `/api/Employees`
        let webApiCall = WebApi(url, '', 'GET')
            .then(response => {
                if (response && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (val.toUpperCase() === 'EMPLOYEEID')
                            return {
                                name: val,
                                alias: 'ID',
                                SearchEnable: true
                            }
                        else if (val.toUpperCase() === 'JOININGDATE')
                            return {
                                name: val,
                                alias: 'Joining Date',
                                formatting: {
                                    type: 'Date', format: 'dd-MM-yyyy'
                                }
                            }
                        else if (val.toUpperCase() === 'EMPLOYMENTTYPE')
                            return {
                                name: val,
                                alias: 'Employment Type',
                            }
                        else if (val.toUpperCase() === 'JOBTITLE')
                            return {
                                name: val,
                                alias: 'Job Title',
                            }
                        else if (val.toUpperCase() === 'FIRSTNAME')
                            return {
                                name: val,
                                alias: 'Name',
                                class:'nameColumn',
                                concatColumns: {
                                    columns: ['FirstName', 'LastName']
                                }
                            }
                        else if (val.toUpperCase() === 'LASTNAME' || val.toUpperCase() === 'EMPLOYEEIMAGE' || val.toUpperCase() === 'ID')
                            return {
                                name: val,
                                hidden: true
                            }
                        else
                            return {
                                name: val,
                            }
                    })
                    setEmployeeData(response);
                    setEmployeeColumns(cols)
                }
            });
        trackPromise(webApiCall)
    }, [])

    const handleAddEmployee = () => {
        navigate('/AddEmployee')
    }

    const rowClicked = (e, row) => {
        navigate('/EditEmployee', { state: row.ID })
    }

    const rowHover = (e, row) => {
        if (!IsNull(row.EmployeeImage) && e.target.classList.contains('nameColumn')) {
            let overlayDiv = document.createElement('div')
            overlayDiv.classList.add("overlayRowDiv")
            overlayDiv.style.cssText += "padding: 2px !important;"
            overlayDiv.innerHTML = "<img class='overlayRowDivImage'  src=" + (IsDev() ? LoadImage(row.EmployeeImage)
                : EmployeeFolder + row.EmployeeImage) + " />"
            e.target.appendChild(overlayDiv)
        }
    }

    const rowOut = (e, row) => {
        document.querySelectorAll('.overlayRowDiv').forEach(i => {
            if (i.parentNode === e.target)
                i.remove();
        });
    }
    return (<div className="mx-0 px-0">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row nowrap m-0 p-0">
                    <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Manage <b>Employees</b></h2></div>
                    <div className="col-sm-4 p-0 m-0">
                        <button type="button" onClick={handleAddEmployee} className="btn btn-success add-new">Add New</button>
                    </div>
                </div>
            </div>
            <div>
                <DataGrid
                    columns={employeeColumns}
                    data={employeeData}
                    pageSize={15}
                    height={"500px"}
                    onRowClick={rowClicked}
                    onRowHover={rowHover}
                    onRowOut={rowOut}
                    width={"inherit"}
                />
            </div>
        </div>
    </div>)
}

export default Employees
