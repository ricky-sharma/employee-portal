import DateFnsUtils from '@date-io/date-fns';
import { FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import ClearIcon from "@material-ui/icons/Clear";
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { Component } from 'react';
import IsNull from '../Common/Common';
import '../css/Input.css';

export class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
        this.inputRef = React.createRef(null);
    }

    componentWillReceiveProps = () => {
        this.setState((state, props) => ({ value: props.value }), () => {
        })
    }

    shouldComponentUpdate(nextProps, nextStats) {
        if (nextProps.value !== this.props.value ||
            nextStats.value !== this.state.value ||
            nextProps.checked !== this.props.checked ||
            nextProps.minDate !== this.props.minDate ||
            nextProps.maxDate !== this.props.maxDate ||
            nextProps.className !== this.props.className) {
            return true;
        } else {
            return false;
        }
    }

    handleClearClick = (e) => {
        e.preventDefault();
        this.setState({ value: '' }, () => {
            if (!IsNull(this.props.onClear)) this.props.onClear('')
        })
    }

    handleDateClearClick = (e) => {
        e.preventDefault();
        this.setState({ value: null }, () => {
            if (!IsNull(this.props.onClear)) this.props.onClear(null)
        })
    }

    render() {
        let type = IsNull(this.props.type) ? 'text' : this.props.type
        switch (type) {
            case 'text':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <TextField
                            label={this.props.label ?? ""}
                            variant={this.props.variant ?? "outlined"}
                            inputRef={this.inputRef}
                            value={this.state.value}
                            required={this.props.required ?? false}
                            onChange={(e) => {
                                return !IsNull(this.props.onChange) ? this.setState({
                                    value: e.target.value
                                }, () => {
                                    this.props.onChange(e)
                                }) : () => { };
                            }}
                            placeholder={this.props.placeholder}
                            className={this.props.className ?? ""}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        style={{
                                            "display": (this.state.value === '' ? "none" : "")
                                        }}
                                        onClick={this.handleClearClick}>
                                        <ClearIcon />
                                    </IconButton>)
                            }}
                            style={{ m: 2, "&.MuiFocused .MuiIconButtonRoot": { color: 'primary.main' } }}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar={this.props.disableToolbar ?? "false"}
                                autoOk={this.props.autoOk ?? "true"}
                                variant={this.props.variant ?? "inline"}
                                inputVariant={this.props.inputVariant ?? "outlined"}
                                label={this.props.label ?? ""}
                                value={this.state.value}
                                required={this.props.required ?? false}
                                className={this.props.className ?? ""}
                                onChange={(date) => {
                                    return !IsNull(this.props.onChange) ? this.setState({
                                        value: date
                                    }, () => {
                                        this.props.onChange(date)
                                    }) : () => { };
                                }}
                                format={this.props.dateFormat ?? "dd/MM/yyyy"}
                                minDate={this.props.minDate ?? new Date('1900-01-01')}
                                maxDate={this.props.maxDate ?? new Date('2099-01-12')}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                );
            case 'dateMonth':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker
                                disableToolbar={this.props.disableToolbar ?? "true"}
                                autoOk={this.props.autoOk ?? "true"}
                                variant={this.props.variant ?? "inline"}
                                inputVariant={this.props.inputVariant ?? "outlined"}
                                label={this.props.label ?? ""}
                                value={this.state.value}
                                required={this.props.required ?? false}
                                className={this.props.className ?? ""}
                                onChange={(date) => {
                                    return !IsNull(this.props.onChange) ? this.setState({
                                        value: date
                                    }, () => {
                                        this.props.onChange(date)
                                    }) : () => { };
                                }}
                                minDate={this.props.minDate ?? new Date('1900-01-01')}
                                maxDate={this.props.maxDate ?? new Date('2099-01-12')}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            style={{
                                                "display": (this.state.value === null ? "none" : "")
                                            }}
                                            onClick={this.handleDateClearClick}>
                                            <ClearIcon />
                                        </IconButton>)
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>);
            case 'select':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <FormControl style={{ m: 1, minWidth: "100%" }}>
                            <InputLabel id={this.props.labelId ?? "simple-select-label"}>{this.props.labelText}</InputLabel>
                            <Select variant={this.props.variant ?? 'outlined'}
                                fullWidth={this.props.fullWidth ?? true}
                                labelId={this.props.labelId ?? "simple-select-label"}
                                value={this.state.value}
                                label={this.props.labelText ?? ""}
                                className={this.props.className ?? ""}
                                id={this.props.id ?? "simple-select"}
                                onChange={(e) => {
                                    return !IsNull(this.props.onChange) ? this.setState({
                                        value: e.target.value
                                    }, () => {
                                        this.props.onChange(e)
                                    }) : () => { };
                                }}>
                                <MenuItem value="">
                                    Select
                                </MenuItem>
                                {this.props.options.map((i, k) => {
                                    return <MenuItem key={k} value={i.value}>{i.text}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                    </div>);
            case 'checkbox':
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.props.checked ?? "false"}
                                onChange={(e) => {
                                    return !IsNull(this.props.onChange) ?
                                        this.props.onChange(e)
                                        : () => { };
                                }}
                                inputProps={{ 'aria-label': 'controlled' }}
                                className={this.props.className ?? ""}
                                color="default" />
                        }
                        label={this.props.label ?? ""}
                        labelPlacement={this.props.labelPlacement ?? "end"} />
                );
            default:
                return null;
        }
    }
}

export default Input