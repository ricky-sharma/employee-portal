import React from 'react';
import { Container } from 'reactstrap';
import IsNull, { ReplaceSpecialChars } from '../../Common/Common';
import AlertDialog from '../../Core/AlertDialog';
import { DataGrid } from '../../Core/DataGrid';
import { GetData } from '../../Helpers/WebApi.ts';

export function ApplicationErrors() {
    let userLogs = GetData('/api/Error')
    if (userLogs.status === 'loaded' && !IsNull(userLogs.payload)) {
        let cols = Object.keys(userLogs.payload[0])
        let columns = []
        cols.map((val) => {
            if (val === 'User')
                columns.push({ Name: val })
            else if (val === 'ErrorCode')
                columns.push({ Name: val, Alias: 'Error Code' })
            else if (val === 'Error')
                columns.push({ Name: val, cssClass: 'col1width400' })
            else if (val === 'CreatedOn')
                columns.push({
                    Name: val, Alias: 'Date',
                    Formatting: {
                        Type: 'Date', Format: 'dd MMM yyyy h:mm:ss a'
                    }
                })
            else if (val === 'ID' || val === 'ErrorInfo')
                columns.push({ Name: val, Hidden: true })
            else
                columns.push({ Name: val })
        })
        let data = []
        userLogs.payload.map((resp, k) => {
            data.push({
                ID: !IsNull(resp.ID) ? resp.ID : '',
                ErrorCode: !IsNull(resp.ErrorCode) ? resp.ErrorCode : '',
                Error: !IsNull(resp.Error) ? resp.Error : '',
                ErrorInfo: !IsNull(resp.ErrorInfo) ? resp.ErrorInfo : '',
                CreatedOn: !IsNull(resp.CreatedOn) ? resp.CreatedOn : '',
                User: ((!IsNull(resp.User) && !IsNull(resp.User.FirstName))
                    ? resp.User.FirstName : '') + ' ' + ((!IsNull(resp.User) && !IsNull(resp.User.LastName)) ? resp.User.LastName : '')
            })
        })

        const ErrorDetail = (error, errorInfo) => {
            return (
                <div>
                    <b><p>{error}</p></b>
                    <p>{errorInfo}</p>
                </div>
            )
        }

        const rowClicked = (e, row) => {
            let error = !IsNull(row.Error) ? JSON.parse(ReplaceSpecialChars(row.Error)) : ''
            let errorInfo = (!IsNull(row.ErrorInfo) && !IsNull(JSON.parse(ReplaceSpecialChars(row.ErrorInfo)).componentStack)
                ? JSON.parse(ReplaceSpecialChars(row.ErrorInfo)).componentStack : (!IsNull(row.ErrorInfo) ? row.ErrorInfo : '')).replace(error, "")
            AlertDialog(() => { return ErrorDetail(error, errorInfo) }, null, "Error Detail", { maxWidth: true })
        }

        let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
        let gridEvents = { OnRowClick: rowClicked }
        return (
            <div className="mx-0 px-0">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row nowrap m-0 p-0">
                            <div className="col-sm-8"><h2>Application <b>Errors</b></h2></div>
                            <div className="col-sm-4">
                            </div>
                        </div>
                    </div>
                    <div>
                        <DataGrid Columns={columns} RowsData={data} Options={options} PageRows={20} GridEvents={gridEvents} Height={"500px"} />
                    </div>
                </div>
            </div>)
    }
    return (<></>)
}

export default ApplicationErrors