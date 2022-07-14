import React from 'react';
import { Container } from 'reactstrap';
import { DataGrid } from '../../Core/DataGrid';
import { useLogService } from './../../Helpers/Logger.ts';

export function Logs() {
    let rowClicked = (e) => {
        console.log(e)
    }
    let userLogs = useLogService()
    if (userLogs.status == 'loaded') {
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
        //let options = { EditButton: { Event: rowClicked }, Type1Button: { Event: rowClicked } }
        let data = userLogs.payload
        return (
            <Container className="mx-0 px-0">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap m-0 p-0">
                            <div className="col-sm-8"><h2>Application <b>Logs</b></h2></div>
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                    <div>
                        <DataGrid Columns={columns} RowsData={data} PageRows={15} />
                    </div>
                </div>
            </Container>)
    }
    return (<></>)
}

export default Logs