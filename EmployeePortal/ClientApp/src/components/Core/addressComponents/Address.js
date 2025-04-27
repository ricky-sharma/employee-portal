import React, { useContext, useState } from 'react';
import PostalAddress from './PostalAddress';

export const ResidentAddressContext = React.createContext();

function Address(props) {

    
    const ResidentAddressContextState = useState([]);
    return (
        <ResidentAddressContext.Provider value={ResidentAddressContextState}>
            <PostalAddress {...props} />
        </ResidentAddressContext.Provider>)
}

export default Address;