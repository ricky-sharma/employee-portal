import { useEffect, useState } from 'react';
import { Service } from './Service';
import { Dictionary } from './Dictionary';
import WebApi from './WebApi';

export function Logger(log: Dictionary<string>) {
    WebApi('/api/Logger', JSON.stringify(log)).then(r => true);
}

export function useLogService() {
    const [result, setResult] = useState < Service < Dictionary < string > [] >> ({
        status: 'loading'
    });

    useEffect(() => {
        WebApi('/api/Logger', '','GET')
            .then(response => response)
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, []);

    return result;
}

export default { Logger, useLogService };