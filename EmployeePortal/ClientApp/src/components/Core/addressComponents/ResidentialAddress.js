import React, { useContext, useEffect } from 'react';
import Input from '../Input';
import { AddressContext } from './Address';

function ResidentialAddress(props) {
    const [addressState, setAddressState] = useContext(AddressContext)
    const { residentialAddressProps, readOnly } = props

    useEffect(() => {
        // eslint-disable-next-line
        console.log(props)
        console.log(addressState)
    }, [addressState])

    return (
        <div className={readOnly === true ? "col-12 p-0 fullInputWidth disabled-inputs" : "col-12 p-0 fullInputWidth"}>
            <div className="col-12 p-0 m-0 row">
                <div className="col-12 p-0">
                    <h6>{residentialAddressProps?.headingTitle ?? 'Residential Address'}</h6>
                </div>
            </div>
            <div className="col-12 p-0 m-0 mt-3 row">
                <div className="col-6 p-0 pr-3">
                    <div className="col-12 p-0">
                        <Input
                            label={residentialAddressProps?.numberLabel ?? "House/Unit number"}
                            error={residentialAddressProps?.houseNumberResiAddError ?? false}
                            value={addressState?.houseNumberResiAdd}
                            onChange={e => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        houseNumberResiAdd: e.target.value,
                                        houseNumberPostAdd: addressState?.sameAsResidentialAddress ? e.target.value : addressState.houseNumberPostAdd
                                    }
                                }))
                            }}
                            onClear={value => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        houseNumberResiAdd: value,
                                        houseNumberPostAdd: addressState?.sameAsResidentialAddress ? value : addressState.houseNumberPostAdd
                                    }
                                }))
                            }}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-6 p-0">
                    <div className="col-12 p-0">
                        <Input
                            label={residentialAddressProps?.streetAddressLabel ?? "Street address"}
                            value={addressState?.streetResiAdd}
                            onChange={e => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        streetResiAdd: e.target.value,
                                        streetPostAdd: addressState?.sameAsResidentialAddress ? e.target.value : addressState.streetPostAdd
                                    }
                                }))
                            }}
                            onClear={value => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        streetResiAdd: value,
                                        streetPostAdd: addressState?.sameAsResidentialAddress ? value : addressState.streetPostAdd
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
                            error={residentialAddressProps?.suburbCityResiAddError ?? false}
                            value={addressState?.suburbCityResiAdd}
                            onChange={e => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        suburbCityResiAdd: e.target.value,
                                        suburbCityPostAdd: addressState?.sameAsResidentialAddress ? e.target.value : addressState.suburbCityPostAdd
                                    }
                                }))
                            }}
                            onClear={value => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        suburbCityResiAdd: value,
                                        suburbCityPostAdd: addressState?.sameAsResidentialAddress ? value : addressState.suburbCityPostAdd
                                    }
                                }))
                            }}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-3 p-0">
                    <div className="col-12 p-0">
                        <Input
                            label="State"
                            error={residentialAddressProps?.stateResiAddError ?? false}
                            value={addressState?.stateResiAdd}
                            onChange={e => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        stateResiAdd: e.target.value,
                                        statePostAdd: addressState?.sameAsResidentialAddress ? e.target.value : addressState.statePostAdd
                                    }
                                }))
                            }}
                            onClear={value => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        stateResiAdd: value,
                                        statePostAdd: addressState?.sameAsResidentialAddress ? value : addressState.statePostAdd
                                    }
                                }))
                            }}
                            customClass="fullWidth" />
                    </div>
                </div>
                <div className="col-3 p-0 pl-3">
                    <div className="col-12 p-0">
                        <Input
                            label="Postal code"
                            error={residentialAddressProps?.postalCodeResiAddError ?? false}
                            value={addressState?.postalCodeResiAdd}
                            onChange={e => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        postalCodeResiAdd: e.target.value,
                                        postalCodePostAdd: addressState?.sameAsResidentialAddress ? e.target.value : addressState.postalCodePostAdd
                                    }
                                }))
                            }}
                            onClear={value => {
                                setAddressState(addressState => ({
                                    ...addressState,
                                    ...{
                                        postalCodeResiAdd: value,
                                        postalCodePostAdd: addressState?.sameAsResidentialAddress ? value : addressState.postalCodePostAdd
                                    }
                                }))
                            }}
                            customClass="fullWidth"
                            helperText={residentialAddressProps?.postalCodeResiAddErrorText ?? ''} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResidentialAddress;