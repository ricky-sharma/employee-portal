import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import PostalAddress from './PostalAddress';
import ResidentialAddress from './ResidentialAddress';

// Create the Address context
export const AddressContext = React.createContext();

// External access to the context value
let externalGetValue;

function AddressProvider(props, ref) {
    const [addressState, setAddressState] = useState({
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
        sameAsResidentialAddress: false
    });

    // Use a ref to hold the context value
    const valueRef = useRef(addressState);

    // Update the ref whenever the value changes
    useEffect(() => {
        valueRef.current = addressState;
        // Expose the external getter once the provider is mounted
        externalGetValue = () => valueRef.current;
    }, [addressState]);

    // Expose setValue via ref to external components
    useImperativeHandle(ref, () => ({
        setAddressStateValue: (newValue) => setAddressState(newValue),
    }));

    return (
        <AddressContext.Provider value={{ addressState, setAddressState }}>
            <ResidentialAddress {...props} />
            <PostalAddress {...props} />
        </AddressContext.Provider>)
}

export const Address = forwardRef((props, ref) => {
    return AddressProvider(props, ref)
});

// Function to directly get context value from outside the component tree
export const GetAddressValues = () => {
    if (externalGetValue) {
        return externalGetValue();
    } else {
        console.warn("The context value is not yet available.");
        return null;
    }
};