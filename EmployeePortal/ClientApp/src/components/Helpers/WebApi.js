import { trackPromise } from 'react-promise-tracker';
import AlertDialog from '../Core/AlertDialog';
import * as Constants from '../../Constants'

function WebApi(apiUrl, data, method = 'POST', auth = true) {
    let authHeader = 'Bearer ' + localStorage.getItem('myToken')
    let serviceUrl = (window.location.protocol !== 'https:' ?
        Constants.DevServiceURL : Constants.ServiceURL)
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
                var errorObj = res.text().then(res1 => {
                    let jsonParseRes1 = JSON.parse(res1)
                    let errorStatus = jsonParseRes1.statusText
                    let responseError = jsonParseRes1.error
                    let error_description = jsonParseRes1.error_description
                    let errorMessage = jsonParseRes1.Message
                    if (errorStatus && errorStatus.toUpperCase() === 'UNAUTHORIZED') {
                        localStorage.removeItem('myToken')
                        AlertDialog('Unauthorized Access')
                    }
                    else if (responseError && responseError.toUpperCase() == 'INVALID_GRANT') {
                        localStorage.removeItem('myToken')
                        AlertDialog(error_description)
                    }
                    else if (errorMessage) {
                        throw errorMessage
                    }
                    return null;
                });
            }
        }
            , error => {
                if (error.toString() === 'TypeError: Failed to fetch') {
                    localStorage.removeItem('myToken')
                    AlertDialog('Employee services are down, please try again later.')
                }
                return null;
            }))
}

export default WebApi