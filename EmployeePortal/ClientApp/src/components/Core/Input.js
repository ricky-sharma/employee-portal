import ClearIcon from "@mui/icons-material/Clear";
import { Checkbox, FormControl, FormControlLabel, FormHelperText, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React, { Component } from 'react';
import IsNull from '../common/Common';
import '../css/Input.css';

export class Input extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.value
        }
        this.inputRef = React.createRef(null);
    }

    static getDerivedStateFromProps = (props, state) => {
        return { value: props.value };
    }

    shouldComponentUpdate(nextProps, nextStats) {
        if (nextProps.value !== this.props.value ||
            nextStats.value !== this.state.value ||
            nextProps.checked !== this.props.checked ||
            nextProps.minDate !== this.props.minDate ||
            nextProps.maxDate !== this.props.maxDate ||
            nextProps.className !== this.props.className ||
            nextProps.error !== this.props.error ||
            nextProps.helperText !== this.props.helperText ||
            nextProps.options !== this.props.options) {
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
                            slotProps={{
                                htmlInput: this.props.inputProps,
                                input: {
                                    endAdornment: (
                                        <IconButton
                                            style={{
                                                "display": (this.state.value === '' ? "none" : "")
                                            }}
                                            onClick={this.handleClearClick}>
                                            {this.props.disabled ? "" : <ClearIcon sx={{ fontSize: '10px !important' }} />}
                                        </IconButton>)
                                }
                            }}
                            value={this.state.value}
                            required={this.props.required ?? false}
                            error={this.props.error ?? false}
                            helperText={!IsNull(this.props.error) && this.props.error === true ?
                                (!IsNull(this.props.helperText) ? this.props.helperText : (!IsNull(this.props.label) ? this.props.label + " is required!" : "Empty field!")) : ""}
                            onChange={(e) => {
                                return !IsNull(this.props.onChange) ? this.setState({
                                    value: e.target.value
                                }, () => {
                                    this.props.onChange(e)
                                }) : () => { };
                            }}
                            type={this.props.dataType ?? "text"}
                            placeholder={this.props.placeholder}
                            className={this.props.className ?? ""}
                            style={{ m: 2, "&.MuiFocused .MuiIconButtonRoot": { color: 'primary.main' } }}
                            disabled={this.props.disabled ?? false}
                        />
                    </div>
                );
            case 'date':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                disableToolbar={this.props.disableToolbar ?? "false"}
                                autoOk={this.props.autoOk ?? "true"}
                                variant={this.props.variant ?? "inline"}
                                inputVariant={this.props.inputVariant ?? "outlined"}
                                label={this.props.label ?? ""}
                                value={this.state.value}
                                error={this.props.error ?? false}
                                disablePast={this.props.disablePast ?? false}
                                disableFuture={this.props.disableFuture ?? false}
                                inputRef={this.props.inputRef ?? null}
                                slotProps={{
                                    textField: {
                                        required: (this.props.required ?? false)
                                    },
                                    field: {
                                        clearable: true,
                                        onClear: this.props.fieldOnClear,
                                        onFocus: this.props.fieldOnFocus,
                                        onBlur: this.props.fieldOnBlur,
                                        required: (this.props.required ?? false)
                                    }
                                }}
                                helperText={!IsNull(this.props.error) && this.props.error === true ?
                                    (!IsNull(this.props.helperText) ? this.props.helperText : (!IsNull(this.props.label) ? this.props.label + " is required!" : "Empty field!")) : ""}
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
                                disabled={this.props.disabled ?? false}
                            />
                        </LocalizationProvider>
                    </div>
                );
            case 'dateMonth':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                views={['month', 'day']}
                                format='dd MMMM'
                                disableToolbar={this.props.disableToolbar ?? "true"}
                                autoOk={this.props.autoOk ?? "true"}
                                variant={this.props.variant ?? "inline"}
                                inputVariant={this.props.inputVariant ?? "outlined"}
                                label={this.props.label ?? ""}
                                value={this.state.value}
                                error={this.props.error ?? false}
                                helperText={!IsNull(this.props.error) && this.props.error === true ?
                                    (!IsNull(this.props.helperText) ? this.props.helperText : (!IsNull(this.props.label) ? this.props.label + " is required!" : "Empty field!")) : ""}
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
                        </LocalizationProvider>
                    </div>);
            case 'select':
                return (
                    <div className={!IsNull(this.props.customClass) ? (this.props.customClass + " customInput") : "customInput"}>
                        <FormControl style={{ m: 1, minWidth: "100%" }} error={(this.props.error ?? false)}
                            required={this.props.required ?? false}>
                            <InputLabel id={this.props.labelId ?? "simple-select-label"}>{this.props.label}</InputLabel>
                            <Select variant={this.props.variant ?? 'outlined'}
                                fullWidth={this.props.fullWidth ?? true}
                                labelId={this.props.labelId ?? "simple-select-label"}
                                value={this.state.value}
                                label={this.props.label ?? ""}
                                id={this.props.id ?? "simple-select"}
                                required={this.props.required ?? false}
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
                            {(this.props.error ?? false) && <FormHelperText error={(this.props.error ?? false)}>{!IsNull(this.props.error) && this.props.error === true ?
                                (!IsNull(this.props.helperText) ? this.props.helperText : (!IsNull(this.props.label) ? this.props.label + " is required!" : "Empty field!")) : ""}</FormHelperText>}
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
                                slotProps={{
                                    htmlInput: { 'aria-label': 'controlled' }
                                }}
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