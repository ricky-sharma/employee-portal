import { trackPromise } from 'react-promise-tracker';

function WebApi(apiUrl, data, method = 'POST', auth = true) {
    let authHeader = 'Bearer ' + localStorage.getItem('myToken')
    let serviceUrl = (window.location.protocol !== 'https:' ?
     'http://employee.service.com':'https://employee.service.com')
    let headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Access-Control-Allow-Origin": '*'
    }
    if (auth)
        headers.Authorization = authHeader

    let requestInfo = {
        method: method,
        withCredentials: true,
        headers: headers
    }
    if (method === 'POST' || method === 'PUT')
        requestInfo.body = data

    return trackPromise(
        fetch(serviceUrl + apiUrl, requestInfo).then(res => {        
        if (res.ok) {
            return res.json();
        } else {            
            var error = res.text();
            let errorStatus = res.statusText
            if (errorStatus.toUpperCase() === 'UNAUTHORIZED') {
                alert('Session has expired.')
                localStorage.removeItem('myToken')
            }
            throw error;
        }
    }).then(result => {
        return result;
    }, error => {
        if (error.toString() === 'TypeError: Failed to fetch') {
            alert('Session has expired.')
            localStorage.removeItem('myToken')
        }        
        return error;
    }))
}

export default WebApi