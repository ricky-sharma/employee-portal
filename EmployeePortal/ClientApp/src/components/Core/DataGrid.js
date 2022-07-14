import React, { Component } from 'react'
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../css/Table.css';
import '../css/DataGrid.css';
import IsNull from '../Common/Global';

export class DataGrid extends Component {
    constructor(props) {
        super(props)
        const { Columns, RowsData, PageRows, GridEvents, Options } = props
        this.state = {
            columns: !IsNull(Columns) ? Columns : null,
            rowsData: RowsData,
            totalRows: RowsData.length,
            EnablePaging: IsNull(PageRows),
            pageRows: !IsNull(PageRows) ? PageRows : RowsData.length,
            noOfPages: 0,
            firstRow: 0,
            currentPageRows: !IsNull(PageRows) ? PageRows : RowsData.length,
            lastPageRows: 10,
            activePage: 1,
            gridCssClass: !IsNull(Options) ? Options.GridCssClass : null,
            headerCssClass: !IsNull(Options) ? Options.HeaderCssClass : null,
            rowCssClass: !IsNull(Options) ? Options.RowCssClass : null,
            hiddenColIndex: !IsNull(Columns) ? Columns.map((col, key) => {
                if (!IsNull(col.Hidden) && col.Hidden)
                    return key;
                else
                    return null;
            }) : null,
            rowClickEnabled: !IsNull(GridEvents) && !IsNull(GridEvents.OnRowClick),
            onRowClick: !IsNull(GridEvents) && !IsNull(GridEvents.OnRowClick) ? GridEvents.OnRowClick : () => { },
            editButtonEnabled: !IsNull(Options) && !IsNull(Options.EditButton),
            editButtonEvent: !IsNull(Options) && !IsNull(Options.EditButton) && !IsNull(Options.EditButton.Event) ? Options.EditButton.Event : () => { },
            type1ButtonEnabled: !IsNull(Options) && !IsNull(Options.Type1Button),
            type1ButtonEvent: !IsNull(Options) && !IsNull(Options.Type1Button) && !IsNull(Options.Type1Button.Event) ? Options.Type1Button.Event : () => { }
        }
    }

    componentWillMount = () => {
        let noOfPages = parseInt(this.state.totalRows / this.state.pageRows, 10)
        let lastPageRows = parseInt(this.state.totalRows % this.state.pageRows, 10)
        if (lastPageRows > 0)
            noOfPages++;
        else if (lastPageRows == 0)
            lastPageRows = this.state.pageRows
        this.setState({
            noOfPages: noOfPages,
            lastPageRows: lastPageRows
        })
    }

    handleForwardPage = (e) => {
        e.preventDefault();
        e.persist();
        if (this.state.activePage !== this.state.noOfPages) {
            this.setState((prevState) => ({ activePage: prevState.activePage + 1 }), () => {
                this.handleChangePage(e, this.state.activePage)
            })
        }
    }

    handleBackwardPage = (e) => {
        e.preventDefault();
        e.persist();
        if (this.state.activePage !== 1) {
            this.setState((prevState) => ({ activePage: prevState.activePage - 1 }), () => {
                this.handleChangePage(e, this.state.activePage)
            })
        }
    }

    handleChangePage = (e, k) => {
        e.preventDefault();
        let pageRows = this.state.pageRows
        if (k === this.state.noOfPages)
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: this.state.lastPageRows, activePage: k })
        else
            this.setState({ firstRow: pageRows * (k - 1), currentPageRows: pageRows, activePage: k })
    }

    renderTableData = (first, count) => {
        let hiddenCols = this.state.hiddenColIndex;
        if (typeof (this.state.rowsData) === 'object' && this.state.rowsData && this.state.rowsData.length) {
            return this.state.rowsData.slice(first, (parseInt(first) + parseInt(count))).map((row, index) => {
                let cols = Object.values(row).map((col, key) => {
                    let classNames = ''
                    if (hiddenCols.some(x => x === key))
                        classNames = classNames + ' d-none';
                    return <td className={classNames} key={key}><div className="px-2">{col}</div></td>
                })
                let editButton = ''
                let type1Button = ''
                if (this.state.editButtonEnabled === true) {
                    editButton = <Link className="edit" title="Edit" onClick={this.state.editButtonEvent} to={(e) => { e.preventDefault(); }} data-toggle="tooltip">
                        <i className="material-icons">&#xE254;</i>
                    </Link>
                }
                if (this.state.type1ButtonEnabled === true) {
                    type1Button = <Link className="changePassword" title="Change Password" onClick={this.state.type1ButtonEvent} to={(e) => { e.preventDefault(); }} data-toggle="tooltip">
                        <i className="material-icons">vpn_key</i>
                    </Link>
                }
                if (this.state.editButtonEnabled === true || this.state.type1ButtonEnabled === true)
                    cols.push(<td className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                        "customWidth45" : "customWidth20"} key={"gridButtons"} >{editButton}{type1Button}</td >)
                return (
                    <tr key={index} style={this.state.rowClickEnabled ? { cursor: 'pointer' } : {}} onClick={(e) => { this.state.onRowClick(row, e) }} className={this.state.rowCssClass !== undefined && this.state.rowCssClass !== null ? this.state.rowCssClass : "gridRows"}>
                        {cols}
                    </tr>
                )
            })
        }
        else return <tr key={"No-Data"} className={this.state.rowCssClass !== undefined && this.state.rowCssClass !== null ? this.state.rowCssClass : "gridRows align-page-center"}>
            <th className="align-page-center" style={{ width: "100%", height: "100%", border: 0 }}>{"No data to display"}</th>
        </tr>
    }

    renderTableHeader = () => {
        if (IsNull(this.state.columns) === true) {
            return null
        }
        let headers = this.state.columns
        if (this.state.editButtonEnabled === true || this.state.type1ButtonEnabled === true) {
            if (headers[headers.length - 1] === '') {
                headers.pop()
            }
            headers.push(...[''])
        }
        let hiddenCols = this.state.hiddenColIndex;
        return headers.map((header, key) => {
            let classNames = '';
            if (hiddenCols.some(x => x === key))
                classNames = classNames + ' d-none';
            var inputProps = {
                className: header.cssClass !== undefined && header.cssClass !== null ? header.cssClass + ' ' + classNames : classNames
            };

            if (header === '')
                return <th className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                    "customWidth45" : "customWidth20"} key={key}><div><span></span></div></th>
            if (header.Alias === null || header.Alias === undefined || header.Name === header.Alias)
                return <th key={key} {...inputProps}><div><div className="px-2">{header.Name}</div><span></span></div></th>
            else if (header.Alias !== null && header.Alias !== undefined && header.Name !== header.Alias)
                return <th key={key} {...inputProps}><div><div className="px-2">{header.Alias}</div><span></span></div></th>
            return null
        })
    }

    renderPagination = () => {
        let pagination = []
        pagination.push(<li key={"leftDots"} className={"m-0 p-0 page-item"}>
            {parseInt(this.state.activePage) > 2 && parseInt(this.state.noOfPages) > 3 ?
                <a onClick={(e) => this.handleChangePage(e, (parseInt(this.state.activePage) - 2))} href='/' className="page-link"><b>{".."}</b></a> : null}
        </li>)
        pagination.push(<li key={"thirdLast"} className={"m-0 p-0 page-item"}>
            {parseInt(this.state.activePage) == parseInt(this.state.noOfPages) && parseInt(this.state.noOfPages) >= 3 ?
                <a onClick={(e) => this.handleChangePage(e, this.state.noOfPages - 2)} href='/' className="page-link">{this.state.noOfPages - 2}</a> : null}
        </li>)
        for (let j = 1; j <= this.state.noOfPages; j++)
            if (parseInt(this.state.activePage) - 1 <= j && parseInt(this.state.activePage) + 1 >= j)
                pagination.push(<li key={j} className={"m-0 p-0 page-item " + (parseInt(this.state.activePage) === j ? "active" : "")}>
                    <a onClick={(e) => this.handleChangePage(e, j)} href='/' className="page-link">{j}</a>
                </li>)
        pagination.push(<li key={"thirdPage"} className={"m-0 p-0 page-item"}>
            {parseInt(this.state.activePage) === 1 && parseInt(this.state.noOfPages) >= 3 ?
                <a onClick={(e) => this.handleChangePage(e, 3)} href='/' className="page-link">{3}</a> : null}
        </li>)
        pagination.push(<li key={"rightDots"} className={"m-0 p-0 page-item"}>
            {parseInt(this.state.noOfPages) - 1 > parseInt(this.state.activePage) && parseInt(this.state.noOfPages) > 3 ?
                <a onClick={(e) => this.handleChangePage(e, (parseInt(this.state.activePage) + 2))} href='/' className="page-link"><b>{".."}</b></a> : null}
        </li>)
        return pagination
    }

    render() {
        const { totalRows, currentPageRows, firstRow, activePage, noOfPages, pageRows, EnablePaging } = this.state
        return (
            <Container className="mx-0 px-0">
                <div className={this.state.gridCssClass !== undefined && this.state.gridCssClass !== null ? "col-12 m-0 p-0 " + this.state.gridCssClass : "col-12 m-0 p-0 customGrid"}>
                    <div className="row col-12 m-0 p-0">
                        <table className="table table-striped table-hover table-bordered border-0 tablemobile pb-1 mx-0 px-0">
                            <thead>
                                <tr className={this.state.headerCssClass !== undefined && this.state.headerCssClass !== null ? this.state.headerCssClass : "gridHeader"}>
                                    {this.renderTableHeader()}
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTableData(firstRow, currentPageRows)}
                            </tbody>
                        </table>
                        <div className="row col-12 pl-3">
                            <div className="hint-text col-4 pl-sm-2 pl-3 m-0 p-0">Showing <b>{totalRows > currentPageRows ? (((activePage - 1) * pageRows + 1) + " to " + ((activePage - 1) * pageRows + currentPageRows)) : totalRows}</b> out of <b>{totalRows}</b> entries</div>
                            <div className="col-2 m-0 p-0"></div>
                            <div className="float-lt col-6 m-0 p-0">
                                <div className="col-12 m-0 p-0">
                                    {EnablePaging === true ? <ul className="pagination">
                                        <li className={"page-item " + (activePage === 1 ? "disabled" : "")}>
                                            <a onClick={(e) => this.handleBackwardPage(e)} href="/" className="page-link remove-bg-color icon-align-center">
                                                <b><i className="fa fa-angle-double-left"></i></b>
                                            </a>
                                        </li>
                                        {this.renderPagination()}
                                        <li className={"page-item " + (activePage === noOfPages ? "disabled" : "")}>
                                            <a onClick={(e) => this.handleForwardPage(e)} href="/" className="page-link remove-bg-color icon-align-center">
                                                <b><i className="fa fa-angle-double-right"></i></b>
                                            </a>
                                        </li>
                                    </ul> : null}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        )
    }
}

export default DataGrid