import React from 'react';
import DataGrid from 'react-data-grid';
import 'react-data-grid/dist/react-data-grid.css';
import { useLogService } from './../../Helpers/Logger.ts';

export function Logs() {
    let userLogs = useLogService()
    if (userLogs.status == 'loaded') {
        let cols = Object.keys(userLogs.payload[0])
        let columns = []
        cols.map((val) => {
            columns.push({ key: val, name: val })
        })
        let data = userLogs.payload
        return (<div class="m-5 p-5"><DataGrid
            columns={columns}
            rows={data} sortColumns={columns}
        /></div>)
    }
    return (<></>)
}

export default Logs