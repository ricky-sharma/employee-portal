import React, { useState } from 'react';
import PostalAddress from './PostalAddress';
import ResidentialAddress from './ResidentialAddress';

export const AddressContext = React.createContext();

function Address(props) {
    const { postalAddressProps } = props

    const AddressContextState = useState({
        houseNumberResiAdd: '',
        streetResiAdd: '',
        suburbCityResiAdd: '',
        stateResiAdd: '',
        postalCodeResiAdd: '',
        houseNumberPostAdd: '',
        streetPostAdd: '',
        suburbCityPostAdd: '',
        statePostAdd: '',
        postalCodePostAdd: '',
        sameAsResidentialAddress: postalAddressProps?.sameResidentialAddress ?? false,
        fieldReadOnly: postalAddressProps?.readOnly ?? false
    });
    return (
        <AddressContext.Provider value={AddressContextState}>
            <ResidentialAddress {...props} />
            <PostalAddress {...props} />
        </AddressContext.Provider>)
}

export default Address;