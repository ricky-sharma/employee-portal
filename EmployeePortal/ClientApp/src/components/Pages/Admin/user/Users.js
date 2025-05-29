import React, { useEffect, useState } from 'react';
import DataGrid, { trackPromise } from 'react-data-grid-lite';
import { Navigate } from "react-router-dom";
import { WebApi } from '../../../helpers/WebApi.ts';

export function Users() {
    const [userData, setUserData] = useState([])
    const [userColumns, setUserColumns] = useState([])
    const [addNewClicked, setAddNewClicked] = useState(false)
    const [editClicked, setEditClicked] = useState(false)
    const [resetPasswordClicked, setResetPasswordClicked] = useState(false)
    const [navigateState, setNavigateState] = useState('')

    useEffect(() => {
        let url = `/api/AspNetUserInfoes`
        let webApiCall = WebApi(url, '', 'GET')
            .then(response => {
                if (response != null && response.length > 0) {
                    let Columns = Object.keys(response[0])
                    let cols = Columns.map((val) => {
                        if (val.toUpperCase() === 'ID'
                            || val.toUpperCase() === 'DOB'
                            || val.toUpperCase() === 'GENDER'
                            || val.toUpperCase() === 'USERINFOVIEWMODEL')
                            return {
                                hidden: true
                            }
                        else if (val.toUpperCase() === 'FIRSTNAME')
                            return {
                                name: val,
                                alias: 'Name',
                                concatColumns: {
                                    columns: ['FirstName', 'LastName']
                                }
                            }
                        else if (val.toUpperCase() === 'LASTNAME')
                            return {
                                name: val,
                                hidden: true
                            }
                        else
                            return { name: val }
                    });
                    setUserData(response);
                    setUserColumns(cols);
                }
            });
        trackPromise(webApiCall)
    }, [])

    const handleAddUser = () => {
        setAddNewClicked(true)
    }

    const rowClicked = (e, row) => {
        setEditClicked(true);
        setNavigateState(row?.UserId ?? '');
    }

    const Type1ButtonClicked = (e, row) => {
        setResetPasswordClicked(true)
        setNavigateState(row?.UserId ?? '')
    }

    if (addNewClicked)
        return <Navigate to='/CreateUser' />
    else if (editClicked)
        return <Navigate to='/EditUser' state={navigateState} />
    else if (resetPasswordClicked)
        return <Navigate to='/ResetPassword' state={navigateState} />

    let options = {
        editButton: {
            event:
                Type1ButtonClicked
        },
        EnableColumnSearch: true,
        EnableGlobalSearch: true
    }
    return (<div className="mx-0 px-0">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row nowrap m-0 p-0">
                    <div
                        className="col-sm-8 p-0 m-0">
                        <h2 className="p-0 m-0">
                            Application <b>Users</b>
                        </h2>
                    </div>
                    <div className="col-sm-4 p-0 m-0">
                        <button
                            type="button"
                            onClick={handleAddUser}
                            className="btn btn-success add-new">
                            Add New
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <DataGrid
                    columns={userColumns}
                    data={userData}
                    pageSize={15}
                    options={options}
                    height={"500px"}
                    width={"inherit"}
                    onRowClick={rowClicked}
                />
            </div>
        </div>
    </div>)
}

export default Users
