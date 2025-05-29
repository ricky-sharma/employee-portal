import React from 'react';
import DataGrid from 'react-data-grid-lite';
import IsNull from '../../common/Common';
import { useLogService } from './../../helpers/Logger.ts';

export function Logs() {
    let columns=[], data = []
    const userLogs = useLogService()
   
    if (userLogs.status === 'loaded' && !IsNull(userLogs.payload)) {
        let cols = Object.keys(userLogs.payload[0])
        columns = cols.map((val) => {
            if (val === 'UserId')
                return { name: val, alias: 'User' }
            else if (val === 'CreatedOn')
                return {
                    name: val, alias: 'Date',
                    formatting: {
                        type: 'Date', format: 'dd MMM yyyy hh:mm:ss a'
                    }
                }
            else if (val === 'LogMessage')
                return { name: val, alias: 'Log' }
            else if (val === 'ID')
                return { name: val, hidden: true }
            else
                return { name: val }
        })
        data = userLogs.payload.map((resp, k) => {
            return {
                ID: !IsNull(resp.ID) ? resp.ID : '',
                Type: !IsNull(resp.Type) ? resp.Type : '',
                User: ((!IsNull(resp.User) && !IsNull(resp.User.FirstName)) ? resp.User.FirstName : '')
                    + ' ' + ((!IsNull(resp.User) && !IsNull(resp.User.LastName)) ? resp.User.LastName : ''),
                CreatedOn: !IsNull(resp.CreatedOn) ? resp.CreatedOn : '',
                LogMessage: !IsNull(resp.LogMessage) ? resp.LogMessage : ''
            }
        })
    }
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
                    <DataGrid
                        columns={columns}
                        data={data}
                        pageSize={20}
                        options={options}
                        height={"500px"}
                        width={"inherit"}
                    />
                </div>
            </div>
        </div>)
}

export default Logs