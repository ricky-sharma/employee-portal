import { Button } from "@material-ui/core";
import { format } from "date-fns";
import React, { Component } from 'react';
import { Container } from 'reactstrap';
import IsNull from '../Common/Common';
import { DynamicSort } from "../Common/Sort";
import '../css/DataGrid.css';

export class DataGrid extends Component {
    constructor(props) {
        super(props)
        const { Columns, RowsData, PageRows, GridEvents, Options } = props
        this.state = {
            gridID: Math.floor(Math.random() * 10000),
            columns: !IsNull(Columns) ? Columns : null,
            rowsData: RowsData,
            totalRows: RowsData.length,
            EnablePaging: !IsNull(PageRows),
            pageRows: !IsNull(PageRows) ? PageRows : RowsData.length,
            noOfPages: 0,
            pagerSelectOptions: [],
            firstRow: 0,
            currentPageRows: !IsNull(PageRows) ? PageRows : RowsData.length,
            lastPageRows: 10,
            activePage: 1,
            gridCssClass: !IsNull(Options) ? Options.GridCssClass : null,
            headerCssClass: !IsNull(Options) ? Options.HeaderCssClass : null,
            rowCssClass: !IsNull(Options) ? Options.RowCssClass : null,
            enableColumnSearch: !IsNull(Options) ? Options.EnableColumnSearch : null,
            enableGlobalSearch: !IsNull(Options) ? Options.EnableGlobalSearch : null,
            hiddenColIndex: !IsNull(Columns) ? Columns.map((col, key) => {
                if (!IsNull(col.Hidden) && col.Hidden)
                    return key;
                else
                    return null;
            }) : null,
            concatColumns: !IsNull(Columns) ? Columns.map((col) => {
                let separator = ' '
                if (!IsNull(col.ConcatColumns) && !IsNull(col.ConcatColumns.Columns)) {
                    if (!IsNull(col.ConcatColumns.Separator))
                        separator = col.ConcatColumns.Separator
                    return { cols: col.ConcatColumns.Columns, sep: separator };
                }
            }) : null,
            columnFormatting: !IsNull(Columns) ? Columns.map((col) => {
                if (!IsNull(col.Formatting) && !IsNull(col.Formatting.Type) && !IsNull(col.Formatting.Format)) {
                    return { type: col.Formatting.Type, format: col.Formatting.Format };
                }
            }) : null,
            cssClassColumns: !IsNull(Columns) ? Columns.map((col, key) => {
                if (!IsNull(col.cssClass))
                    return col.cssClass;
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
        this.sortIconHtml = <i className='updown-icon inactive fa fa-sort' />
        this.dataRecieved = this.state.rowsData
        this.searchCols = []
    }

    componentWillMount = () => {
        this.setPagingVariables()
    }

    setPagingVariables = () => {
        let noOfPages = parseInt(this.state.totalRows / this.state.pageRows, 10)
        let lastPageRows = parseInt(this.state.totalRows % this.state.pageRows, 10)
        if (lastPageRows > 0)
            noOfPages++;
        else if (lastPageRows == 0)
            lastPageRows = this.state.pageRows
        let pagerSelectOptions = [...Array(noOfPages).keys()].map(i => i + 1);
        this.setState({
            noOfPages: noOfPages,
            lastPageRows: lastPageRows,
            pagerSelectOptions: pagerSelectOptions.map((o, key) => <option key={key} value={o}>{o}</option>)
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
        let concatCols = this.state.concatColumns;
        let colFormatting = this.state.columnFormatting;
        let cssClassCols = this.state.cssClassColumns;
        if (typeof (this.state.rowsData) === 'object' && this.state.rowsData && this.state.rowsData.length) {
            return this.state.rowsData.slice(first, (parseInt(first) + parseInt(count))).map((row, index) => {
                let cols = Object.values(row).map((col, key) => {
                    let conCols = null;
                    let conSep = null;
                    let conValue = '';
                    if (!IsNull(concatCols[key]) && !IsNull(concatCols[key].cols)) {
                        conCols = concatCols[key].cols
                        conSep = concatCols[key].sep
                    }
                    this.state.columns.map((c) => {
                        if (!IsNull(conCols) && !IsNull(c.Name) && conCols.some(x => x.toUpperCase() === c.Name.toUpperCase())) {
                            conValue = conValue + row[c.Name] + conSep
                        }
                    })
                    if (!IsNull(conSep) && !IsNull(conValue)) {
                        let sepLenth = conSep.length
                        if (conValue.length > 0 && conValue.slice(-sepLenth) === conSep) {
                            conValue = conValue.slice(0, conValue.length - sepLenth)
                        }
                    }
                    let classNames = '', hideClass = ''
                    if (!IsNull(cssClassCols[key]))
                        classNames = cssClassCols[key];
                    if (hiddenCols.some(x => x === key))
                        hideClass = 'd-none';
                    let columnValue = conValue !== '' ? conValue : col
                    if (!IsNull(columnValue) && !IsNull(colFormatting[key]) && !IsNull(colFormatting[key].type) && !IsNull(colFormatting[key].format)) {
                        if (colFormatting[key].type.toUpperCase() === 'DATE' || colFormatting[key].type.toUpperCase() === 'DATETIME')
                            columnValue = format(new Date(columnValue), colFormatting[key].format)
                    }
                    return <td className={hideClass + (!IsNull(cssClassCols[key]) ? (' ' + cssClassCols[key]) : '')} key={key}><div className={classNames + " m-0 p-0"}>{columnValue}</div></td>
                })
                let editButton = ''
                let type1Button = ''
                if (this.state.editButtonEnabled === true) {
                    editButton = <Button className="edit px-sm-2 p-0 m-0" title="Edit" onClick={(e) => this.state.editButtonEvent(e, row)} data-toggle="tooltip">
                        <i className="material-icons">&#xE254;</i>
                    </Button>
                }
                if (this.state.type1ButtonEnabled === true) {
                    type1Button = <Button className="changePassword px-sm-2 p-0 m-0" title="Change Password" onClick={(e) => this.state.type1ButtonEvent(e, row)} data-toggle="tooltip">
                        <i className="material-icons">vpn_key</i>
                    </Button>
                }
                if (this.state.editButtonEnabled === true || this.state.type1ButtonEnabled === true)
                    cols.push(<td onClick={(e) => e.stopPropagation()} style={{ cursor: "auto" }} key={"gridButtons"}
                        className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                            "col1width125" : "col1width75"} >
                        <div className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                            "col1width125 m-0 p-0" : "col1width75 m-0 p-0"}>{editButton}{type1Button}</div></td >)
                return (
                    <tr key={index} style={this.state.rowClickEnabled ? { cursor: 'pointer' } : {}} onClick={(e) => this.state.onRowClick(e, row)}
                        className={this.state.rowCssClass !== undefined && this.state.rowCssClass !== null ? this.state.rowCssClass : "gridRows"}>
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
        let hiddenCols = this.state.hiddenColIndex;
        let headers = this.state.columns
        let enableColSearch = this.state.enableColumnSearch
        let concatCols = this.state.concatColumns;
        let columnSearchEnabled = false, searchRowEnabled = false, inputProps = ''
        if (this.state.editButtonEnabled === true || this.state.type1ButtonEnabled === true) {
            if (headers[headers.length - 1] === '') {
                headers.pop()
            }
            headers.push(...[''])
        }
        let thColHeaders = headers.map((header, key, { length }) => {
            let thInnerHtml = ''
            if (length !== key + 1) {
                thInnerHtml = <span></span>
            }
            let classNames = '', hideClass = ''
            if (hiddenCols.some(x => x === key))
                hideClass = 'd-none';
            inputProps = {
                className: !IsNull(header.cssClass) ? header.cssClass + ' row p-0 m-0' : 'row p-0 m-0'
            };
            let thHtml = ''
            if (header === '') {
                thHtml = <th key={key} className={hideClass + ((this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                    " col1width125 p-0 " : " col1width75 ") + (!IsNull(header.cssClass) ? (' ' + header.cssClass) : '')}>
                    <div className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                        "col1width125 p-0 inline-display" : "col1width75 p-0 inline-display"}></div>{thInnerHtml}</th>
            }
            else if (IsNull(header.Alias) || header.Name === header.Alias) {
                thHtml = <th key={key} className={hideClass + (!IsNull(header.cssClass) ? (' ' + header.cssClass) : '')}>
                    <div {...inputProps}><div onClick={(e) => { this.tableHeaderClicked(e, header.Name) }}
                        className="p-0 pointer inline-display">{header.Name}{this.sortIconHtml}</div></div>{thInnerHtml}</th>
            }
            else if (!IsNull(header.Alias) && header.Name !== header.Alias) {
                thHtml = <th key={key} className={hideClass + (!IsNull(header.cssClass) ? (' ' + header.cssClass) : '')}>
                    <div {...inputProps}><div onClick={(e) => { this.tableHeaderClicked(e, header.Name) }}
                        className="p-0 pointer inline-display">{header.Alias}{this.sortIconHtml}</div></div>{thInnerHtml}</th>
            }
            return thHtml
        })
        let thSearchHeaders = headers.map((header, key) => {
            let conCols = null;
            let classNames = '', hideClass = ''
            let formatting = null
            if (!IsNull(concatCols[key]) && !IsNull(concatCols[key].cols)) {
                conCols = concatCols[key].cols
            }
            if (!IsNull(header.Formatting)) {
                formatting = header.Formatting
            }
            if (hiddenCols.some(x => x === key))
                hideClass = 'd-none';
            inputProps = {
                className: !IsNull(header.cssClass) ? header.cssClass + ' row searchDiv p-0 m-0' : 'row searchDiv p-0 m-0'
            };
            columnSearchEnabled = (!IsNull(enableColSearch) ? enableColSearch : false) == true ?
                (!IsNull(header.SearchEnable) ? header.SearchEnable : true) : (!IsNull(header.SearchEnable) ? header.SearchEnable : false)
            if (columnSearchEnabled) searchRowEnabled = true;
            if (header === '') {
                return <th key={key} className={hideClass + ((this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                    " col1width125 p-0 " : " col1width75 ") + (!IsNull(header.cssClass) ? (' ' + header.cssClass) : '')}>
                    <div className={(this.state.editButtonEnabled === true && this.state.type1ButtonEnabled === true) ?
                        "col1width125 p-0 inline-display" : "col1width75 p-0 inline-display"}></div></ th>
            }
            else {
                return <th key={key} className={hideClass + (!IsNull(header.cssClass) ? (' ' + header.cssClass) : '')}><div {...inputProps}>
                    {columnSearchEnabled ? <input className="searchInput" placeholder={"Search"}
                        onChange={(e) => this.handleColSearch(e, header.Name, conCols, formatting)} type="text" /> : <>.</>}</div></ th>
            }
        })
        let thRowHtml = <tr className={!IsNull(this.state.headerCssClass) ? this.state.headerCssClass : "gridHeader"} id={"thead-row-" + this.state.gridID}>
            {thColHeaders}</tr>
        let thRowSearchHtml = <tr className={!IsNull(this.state.headerCssClass) ? this.state.headerCssClass : "searchHeader"}>
            {thSearchHeaders}</tr>
        return <thead>{thRowHtml}{searchRowEnabled ? thRowSearchHtml : <></>}</thead>
    }

    tableHeaderClicked = (e, name) => {
        if (e.target.nodeName == "DIV" || e.target.nodeName == "I") {
            let sortColumn = ''
            let element = e.target.nodeName == "I" ? e.target : e.target.querySelector('i');
            let i = document.createElement('i');
            i.classList.add("fa", "updown-icon");
            if (!IsNull(element)) {
                if (element.classList.contains("fa-sort-down") || element.classList.contains("fa-sort")) {
                    i.classList.add("fa-sort-up");
                    sortColumn = name
                }
                else {
                    i.classList.add("fa-sort-down");
                    sortColumn = '-' + name
                }
            }
            else {
                i.classList.add("fa-sort-up");
                sortColumn = name
            }
            let theadRow = document.getElementById("thead-row-" + this.state.gridID)
            if (!IsNull(theadRow)) {
                let sortIcons = theadRow.getElementsByTagName('i')
                if (!IsNull(sortIcons)) {
                    Array.from(sortIcons).map((si, k) => {
                        if (si.classList.contains("fa-sort-up")) si.classList.remove("fa-sort-up")
                        if (si.classList.contains("fa-sort-down")) si.classList.remove("fa-sort-down")
                        if (!si.classList.contains("fa-sort")) si.classList.add("fa-sort", "inactive")
                    })
                }
            }
            if (e.target.nodeName == "I") {
                let parentElement = e.target.parentNode
                if (!IsNull(element))
                    parentElement.removeChild(element);
                parentElement.appendChild(i)
            }
            else {
                if (!IsNull(element))
                    e.target.removeChild(element);
                e.target.appendChild(i);
            }

            let data = this.state.rowsData
            if (this.state.totalRows === data.length) {
                data = this.dataRecieved
            }
            data.sort(DynamicSort(sortColumn))
            this.setState({ rowsData: data })
        }
    }

    handleColSearch = (e, colName, colObject, formatting) => {
        let searchQuery = e.target.value
        let keyFormat = ''
        let formatType = ''
        let colObj = null;
        if (!IsNull(colObject)) {
            colObj = colObject
        }
        if (!IsNull(formatting)) {
            if (!IsNull(formatting.Type) && !IsNull(formatting.Format)) {
                keyFormat = formatting.Format
                formatType = formatting.Type
            }
        }
        let data = this.dataRecieved
        if (searchQuery !== '') {
            this.searchCols = this.searchCols.filter(x => x.colName !== colName);
            this.searchCols.push({ colName, searchQuery, colObj, format: { keyFormat, formatType } })
        }
        else {
            this.searchCols = this.searchCols.filter(x => x.colName !== colName);
        }
        let globalSearchData = []
        this.searchCols.map((col, key) => {
            if (col.colName === '##globalSearch##') {
                col.colObj.map((c, k) => {
                    let colObjSearchData = []
                    let hidden = !IsNull(c.Hidden) ? c.Hidden : false
                    if (!IsNull(c.format) && !IsNull(c.format.formatType) && !IsNull(c.format.keyFormat) &&
                        (c.format.formatType.toUpperCase() === 'DATE' || c.format.formatType.toUpperCase() === 'DATETIME') && c.format.keyFormat !== '') {
                        if (!IsNull(c.ConcatColumns) && !IsNull(c.ConcatColumns.Columns)) {
                            colObjSearchData =
                                data.filter(obj => Object.keys(obj).some(key => c.ConcatColumns.Columns.some(x => x.toString().toLowerCase()
                                    === key.toString().toLowerCase()) && hidden === false && format(new Date(obj[key]), c.format.keyFormat)
                                        .toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())))
                        }
                        else {
                            colObjSearchData =
                                data.filter(obj => Object.keys(obj).some(key => key.toString().toLowerCase() === c.Name.toString().toLowerCase() &&
                                    hidden === false && format(new Date(obj[key]), c.format.keyFormat).toString().toLowerCase().includes(
                                        col.searchQuery.toString().toLowerCase())))
                        }
                    }
                    else {
                        if (!IsNull(c.ConcatColumns) && !IsNull(c.ConcatColumns.Columns)) {
                            colObjSearchData =
                                data.filter(obj => Object.keys(obj).some(key => c.ConcatColumns.Columns.some(x => x.toString().toLowerCase() === key.toString()
                                    .toLowerCase()) && hidden === false && obj[key].toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())))
                        }
                        else {
                            colObjSearchData =
                                data.filter(obj => Object.keys(obj).some(key => key.toString().toLowerCase() === c.Name.toString().toLowerCase() && hidden === false
                                    && obj[key].toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())))
                        }
                    }
                    if (globalSearchData.length > 0) {
                        var ids = new Set(globalSearchData.map(d => d.ID));
                        globalSearchData = [...globalSearchData, ...colObjSearchData.filter(d => !ids.has(d.ID))];
                    }
                    else {
                        globalSearchData = [...colObjSearchData];
                    }
                })
                data = [...globalSearchData]
            }
            else {
                if ((col.format.formatType.toUpperCase() === 'DATE' || col.format.formatType.toUpperCase() === 'DATETIME') && col.format.keyFormat !== '') {
                    if (!IsNull(col.colObj)) {
                        data = data.filter(obj => Object.keys(obj).some(key => col.colObj.some(x => x.toString().toLowerCase() === key.toString().toLowerCase())
                            && format(new Date(obj[key]), col.format.keyFormat).toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())));
                    }
                    else {
                        data = data.filter(obj => Object.keys(obj).some(key => key.toString().toLowerCase() === col.colName.toString().toLowerCase()
                            && format(new Date(obj[key]), col.format.keyFormat).toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())));
                    }
                }
                else {
                    if (!IsNull(col.colObj)) {
                        data = data.filter(obj => Object.keys(obj).some(key => col.colObj.some(x => x.toString().toLowerCase() === key.toString().toLowerCase())
                            && obj[key].toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())));
                    }
                    else {
                        data = data.filter(obj => Object.keys(obj).some(key => key.toString().toLowerCase() === col.colName.toString().toLowerCase() && obj[key]
                            .toString().toLowerCase().includes(col.searchQuery.toString().toLowerCase())));
                    }
                }
            }
        })
        let dataLength = data.length
        let pageRows = this.state.pageRows
        this.setState({
            rowsData: data,
            activePage: 1,
            totalRows: dataLength,
            firstRow: 0,
            currentPageRows: pageRows
        }, () => { this.setPagingVariables() })
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
                {this.state.enableGlobalSearch ? <div className="row col-12 globalSearchDiv">
                    <input className="globalSearch" placeholder="Global Search" onChange={(e) => this.handleColSearch(e, '##globalSearch##', this.state.columns)} type="text" />
                </div> : <></>}
                <div className={this.state.gridCssClass !== undefined && this.state.gridCssClass !== null ? "col-12 m-0 p-0 " + this.state.gridCssClass : "col-12 m-0 p-0 customGrid"}>
                    <div className="row col-12 m-0 p-0" >
                        <table className="table table-striped table-hover table-bordered border-0 border-bottom m-0 mx-0 px-0">
                            {this.renderTableHeader()}
                            <tbody>
                                {this.renderTableData(firstRow, currentPageRows)}
                            </tbody>
                        </table>
                        <div className="row col-12 m-0 p-0 align-center">
                            <div className="col-5 pl-2 m-0 p-0">Showing <b>{totalRows > currentPageRows ? (((activePage - 1) * pageRows + 1) + " to " + ((activePage - 1) * pageRows + currentPageRows)) : totalRows}</b> out of <b>{totalRows}</b> entries</div>
                            <div className="col-2 m-0 p-0" style={{ textAlign: "center" }}>
                                <select className="pagerSelect" value={activePage} onChange={(e) => { this.handleChangePage(e, parseInt(e.target.value)) }}>
                                    {this.state.pagerSelectOptions}
                                </select>
                            </div>
                            <div className="float-lt col-5 m-0 p-0 pr-2">
                                <div className="col-12 m-0 p-0">
                                    {EnablePaging === true ? (<ul className="pagination align-center">
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
                                    </ul>) : null}
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