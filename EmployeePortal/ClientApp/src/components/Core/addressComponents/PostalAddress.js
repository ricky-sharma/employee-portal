import React, { useContext, useEffect } from 'react';
import Input from '../Input';
import { AddressContext } from './Address';

function PostalAddress(props) {
    const { addressState, setAddressState } = useContext(AddressContext)
    const { postalAddressProps, residentialAddressProps, readOnly } = props

    useEffect(() => {
        if (addressState?.sameAsResidentialAddress === true) {
            setAddressState(addressState => ({
                ...addressState,
                ...{
                    houseNumberPostAdd: addressState.houseNumberResiAdd,
                    streetPostAdd: addressState.streetResiAdd,
                    suburbCityPostAdd: addressState.suburbCityResiAdd,
                    statePostAdd: addressState.stateResiAdd,
                    postalCodePostAdd: addressState.postalCodeResiAdd,
                }
            }))
        }
    }, [addressState?.sameAsResidentialAddress])// eslint-disable-line

    return (
        <div className={readOnly === true ? "col-12 p-0 fullInputWidth disabled-inputs" : "col-12 p-0 fullInputWidth"}>
            <div className="col-12 p-0 m-0 row">
                <div className="col-12 p-0">
                    <h6>Postal Address</h6>
                </div>
            </div>
            <div className="col-12 p-0 m-0 mt-3 row">
                <div className="col-12 p-0 m-0 row valignCenter">
                    <Input
                        label={`Same as ${residentialAddressProps?.headingTitle ?? "Residential Address"}`}
                        checked={addressState.sameAsResidentialAddress}
                        type="checkbox"
                        onChange={(e) => {
                            setAddressState(addressState => ({
                                ...addressState,
                                ...{
                                    sameAsResidentialAddress: e.target.checked
                                }
                            }))
                        }} />
                </div>
            </div>
            <div className="col-12 p-0 m-0 mt-3 row">
                <div className="col-6 p-0 pr-3">
                    <div className="col-12 p-0">
                        <Input
                            label={residentialAddressProps?.numberLabel ?? "House/Unit number"}
                            error={postalAddressProps?.houseNumberPostAddError ?? false}
                            value={addressState.houseNumberPostAdd}
                            className={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? "disabled-inputs" : "")}
                            disabled={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? true : false)}
                            onChange={(e) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        houseNumberPostAdd: e.target.value
                                    }
                                }))
                            }}
                            onClear={(value) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        houseNumberPostAdd: value
                                    }
                                }))
                            }}
                            required={true}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-6 p-0">
                    <div className="col-12 p-0">
                        <Input
                            label={residentialAddressProps?.streetAddressLabel ?? "Street address"}
                            value={addressState.streetPostAdd}
                            className={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? "disabled-inputs" : "")}
                            disabled={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? true : false)}
                            onChange={(e) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        streetPostAdd: e.target.value
                                    }
                                }))
                            }}
                            onClear={(value) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        streetPostAdd: value
                                    }
                                }))
                            }}
                            customClass="fullWidth" />
                    </div>
                </div>
            </div>
            <div className="col-12 p-0 pb-5 m-0 mt-3 row">
                <div className="col-6 p-0 pr-3">
                    <div className="col-12 p-0">
                        <Input
                            label="Suburb/City"
                            error={postalAddressProps?.suburbCityPostAddError ?? false}
                            value={addressState.suburbCityPostAdd}
                            className={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? "disabled-inputs" : "")}
                            disabled={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? true : false)}
                            onChange={(e) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        suburbCityPostAdd: e.target.value
                                    }
                                }))
                            }}
                            onClear={(value) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        suburbCityPostAdd: value
                                    }
                                }))
                            }}
                            required={true}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-3 p-0">
                    <div className="col-12 p-0">
                        <Input
                            label="State"
                            error={postalAddressProps?.statePostAddError ?? false}
                            value={addressState.statePostAdd}
                            className={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? "disabled-inputs" : "")}
                            disabled={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? true : false)}
                            onChange={(e) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        statePostAdd: e.target.value
                                    }
                                }))
                            }}
                            onClear={(value) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        statePostAdd: value
                                    }
                                }))
                            }}
                            required={true}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-3 p-0 pl-3">
                    <div className="col-12 p-0">
                        <Input
                            label="Postal code"
                            helperText={postalAddressProps?.postalCodePostAddErrorText ?? ''}
                            error={postalAddressProps?.postalCodePostAddError ?? false}
                            value={addressState.postalCodePostAdd}
                            className={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? "disabled-inputs" : "")}
                            disabled={((addressState?.sameAsResidentialAddress === true || readOnly === true) ? true : false)}
                            onChange={(e) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        postalCodePostAdd: e.target.value
                                    }
                                }))
                            }}
                            onClear={(value) => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        postalCodePostAdd: value
                                    }
                                }))
                            }}
                            required={true}
                            customClass="fullWidth" />
                    </div>
                </div>
            </div>
        </div>);
}

export default PostalAddress;