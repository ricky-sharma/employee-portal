import React from 'react';
import IsNull, { ReplaceSpecialChars } from '../../common/Common';
import DataGrid from 'react-data-grid-lite';
import AlertDialog from '../../Core/ModalDialogs';
import { GetData } from '../../helpers/WebApi.ts';

export function Errors() {
    let columns, data = []
    let userLogs = GetData('/api/Error')
    if (userLogs.status === 'loaded' && !IsNull(userLogs.payload)) {
        let cols = Object.keys(userLogs.payload[0])
        columns = cols.map((val) => {
            if (val === 'User')
                return { name: val }
            else if (val === 'ErrorCode')
                return { name: val, alias: 'Error Code' }
            else if (val === 'Error')
                return { name: val }
            else if (val === 'CreatedOn')
                return {
                    name: val, alias: 'Date',
                    formatting: {
                        type: 'Date', format: 'dd MMM yyyy HH:mm:ss'
                    }
                }
            else if (val === 'ID' || val === 'ErrorInfo')
                return { name: val, hidden: true }
            else
                return { name: val }
        })
        data = userLogs.payload.map((resp, k) => {
            return {
                ID: !IsNull(resp.ID) ? resp.ID : '',
                ErrorCode: !IsNull(resp.ErrorCode) ? resp.ErrorCode : '',
                Error: !IsNull(resp.Error) ? resp.Error : '',
                ErrorInfo: !IsNull(resp.ErrorInfo) ? resp.ErrorInfo : '',
                CreatedOn: !IsNull(resp.CreatedOn) ? resp.CreatedOn : '',
                User: ((!IsNull(resp.User) && !IsNull(resp.User.FirstName))
                    ? resp.User.FirstName : '') + ' ' + ((!IsNull(resp.User) && !IsNull(resp.User.LastName)) ? resp.User.LastName : '')
            }
        })
    }

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
        AlertDialog(() => { return ErrorDetail(error, errorInfo) }, null, "Error Detail", true)
    }

    let options = { EnableColumnSearch: true, EnableGlobalSearch: true }
    return (
        <div className="mx-0 px-0">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row nowrap m-0 p-0">
                        <div className="col-sm-8 p-0 m-0">
                            <h2 className="p-0 m-0">Application <b>Errors</b></h2>
                        </div>
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
                        onRowClick={rowClicked}
                    />
                </div>
            </div>
        </div>)

}

export default Errors