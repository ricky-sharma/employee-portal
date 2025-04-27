import React, { useContext, useEffect, useState } from 'react';
import Input from '../Input';
import { ResidentAddressContext } from './Address';

function PostalAddress(props) {
    const [ResidentAddressState] = useContext(ResidentAddressContext)
    const { readOnly, sameResidentialAddress, houseNumberPostAddError, suburbCityPostAddError, statePostAddError,
        postalCodePostAddError, postalCodePostAddErrorText } = props
    const [sameAsResidentialAddress, setSameAsResidentialAddress] = useState(sameResidentialAddress)
    const [fieldReadOnly, setFieldReadOnly] = useState(readOnly)
    const [houseNumberPostAdd, setHouseNumberPostAdd] = useState('')
    const [streetPostAdd, setStreetPostAdd] = useState('')
    const [suburbCityPostAdd, setSuburbCityPostAdd] = useState('')
    const [statePostAdd, setStatePostAdd] = useState('')
    const [postalCodePostAdd, setPostalCodePostAdd] = useState('')

    const handleCheckboxSameResiAddress = (e) => {
        setSameAsResidentialAddress(e.target.checked)
    }

    useEffect(() => {
        if (sameAsResidentialAddress === true) {
            setHouseNumberPostAdd(ResidentAddressState?.houseNumberPostAdd ?? '')
            setStreetPostAdd(ResidentAddressState?.streetResiAdd ?? '')
            setSuburbCityPostAdd(ResidentAddressState?.suburbCityResiAdd ?? '')
            setStatePostAdd(ResidentAddressState?.stateResiAdd ?? '')
            setPostalCodePostAdd(ResidentAddressState?.postalCodeResiAdd ?? '')
            setFieldReadOnly(true)
        }
        else {
            setFieldReadOnly(false)
        }
    }, [sameAsResidentialAddress])

    return (<div className="col-12 p-0 fullInputWidth">
        <div className="col-12 p-0 m-0 row">
            <div className="col-12 p-0">
                <h6>Postal Address</h6>
            </div>
        </div>
        <div className="col-12 p-0 m-0 mt-3 row">
            <div className="col-12 p-0 m-0 row valignCenter">
                <Input label="Same as Residential Address" checked={sameAsResidentialAddress} type="checkbox"
                    onChange={handleCheckboxSameResiAddress} />
            </div>
        </div>
        <div className="col-12 p-0 m-0 mt-3 row">
            <div className="col-6 p-0 pr-3">
                <div className="col-12 p-0">
                    <Input label="House/Unit number" error={houseNumberPostAddError} value={houseNumberPostAdd}
                        className={(fieldReadOnly === true ? "disabled-inputs" : "")}
                        onChange={(e) => setHouseNumberPostAdd(e.target.value)}
                        onClear={(value) => setHouseNumberPostAdd(value)} customClass="fullWidth" />
                </div>
            </div>
            <div className="col-6 p-0">
                <div className="col-12 p-0">
                    <Input label="Street address" value={streetPostAdd}
                        onChange={(e) => setStreetPostAdd(e.target.value)}
                        className={(fieldReadOnly === true ? "disabled-inputs" : "")}
                        onClear={(value) => setStreetPostAdd(value)} customClass="fullWidth" />
                </div>
            </div>
        </div>
        <div className="col-12 p-0 py-5 m-0 mt-3 row">
            <div className="col-6 p-0 pr-3">
                <div className="col-12 p-0">
                    <Input label="Suburb/City" error={suburbCityPostAddError} value={suburbCityPostAdd}
                        className={(fieldReadOnly === true ? "disabled-inputs" : "")}
                        onChange={(e) => setSuburbCityPostAdd(e.target.value)}
                        onClear={(value) => setSuburbCityPostAdd(value)} customClass="fullWidth" />
                </div>
            </div>
            <div className="col-3 p-0">
                <div className="col-12 p-0">
                    <Input label="State" error={statePostAddError} value={statePostAdd}
                        className={(fieldReadOnly === true ? "disabled-inputs" : "")}
                        onChange={(e) => setStatePostAdd(e.target.value)}
                        onClear={(value) => setStatePostAdd(value)} customClass="fullWidth" />
                </div>
            </div>
            <div className="col-3 p-0 pl-3">
                <div className="col-12 p-0">
                    <Input label="Postal code" helperText={postalCodePostAddErrorText} error={postalCodePostAddError} value={postalCodePostAdd}
                        className={(fieldReadOnly === true ? "disabled-inputs" : "")}
                        onChange={(e) => setPostalCodePostAdd(e.target.value)}
                        onClear={(value) => setPostalCodePostAdd(value)} customClass="fullWidth" />
                </div>
            </div>
        </div>
    </div>);
}

export default PostalAddress;