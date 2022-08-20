﻿import React from 'react';
import IsNull from '../../Common/Common';
import { DataGrid } from '../../Core/DataGrid';
import { useLogService } from './../../Helpers/Logger.ts';

export function ApplicationLogs() {
    let userLogs = useLogService()
    if (userLogs.status === 'loaded' && !IsNull(userLogs.payload)) {
        let cols = Object.keys(userLogs.payload[0])
        let columns = []
        cols.map((val) => {
            if (val === 'UserId')
                columns.push({ Name: val, Alias: 'User' })
            else if (val === 'CreatedOn')
                columns.push({
                    Name: val, Alias: 'Date',
                    Formatting: {
                        Type: 'Date', Format: 'dd MMM yyyy h:mm:ss a'
                    }
                })
            else if (val === 'LogMessage')
                columns.push({ Name: val, Alias: 'Log' })
            else if (val === 'ID')
                columns.push({ Name: val, Hidden: true })
            else
                columns.push({ Name: val })
        })
        let data = []
        userLogs.payload.map((resp, k) => {
            data.push({
                ID: !IsNull(resp.ID) ? resp.ID : '',
                Type: !IsNull(resp.Type) ? resp.Type : '',
                User: ((!IsNull(resp.User) && !IsNull(resp.User.FirstName)) ? resp.User.FirstName : '') + ' ' + ((!IsNull(resp.User) && !IsNull(resp.User.LastName)) ? resp.User.LastName : ''),
                CreatedOn: !IsNull(resp.CreatedOn) ? resp.CreatedOn : '',
                LogMessage: !IsNull(resp.LogMessage) ? resp.LogMessage : ''
            })
        })
        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        return (
            <div className="mx-0 px-0">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap m-0 p-0">
                            <div className="col-sm-8 p-0 m-0"><h2 className="p-0 m-0">Application <b>Logs</b></h2></div>
                        </div>
                    </div>
                    <div>
                        <DataGrid Columns={columns} RowsData={data} Options={options} PageRows={20} Height={"500px"} />
                    </div>
                </div>
            </div>)
    }
    return (<></>)
}

export default ApplicationLogs