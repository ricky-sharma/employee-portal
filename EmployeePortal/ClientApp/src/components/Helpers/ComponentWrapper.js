import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// This functional wrapper component gives class components access to `location` and 'navigate' via props
const ComponentWrapper = ({ component: Component }) => {
    const location = useLocation();
    const navigate = useNavigate();
    return <Component location={location} navigate={navigate} />;
};

export default ComponentWrapper;
