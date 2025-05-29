import { createBrowserHistory } from 'history';
import { useEffect, useState } from 'react';
import { trackPromise } from 'react-data-grid-lite';
import * as Constants from '../../Constants';
import IsNull from '../common/Common';
import AlertDialog from '../Core/ModalDialogs';
import { store } from './../../redux/store';
import { Dictionary } from './Dictionary';
import { Service } from './Service';
import { logoutUser } from './../../redux/reducers/userSlice';

const history = createBrowserHistory();
let errorCatched = false;

export function GetData(apiUrl: any) {
    const [result, setResult] = useState<Service<Dictionary<string>[]>>({
        status: 'loading'
    });
    useEffect(() => {
        WebApi(apiUrl, {}, 'GET')
            .then(response => response)
            .then(response => setResult({ status: 'loaded', payload: response }))
            .catch(error => setResult({ status: 'error', error }));
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return result;
}

export function WebApi(apiUrl: any, data: any, method = 'POST', auth = true) {
    let authHeader = 'Bearer ' + store?.getState()?.authToken
    let serviceUrl = (window.location.protocol !== 'https:' ?
        Constants.DevServiceURL : Constants.ServiceURL)
    let headers: Record<string, any> = {};
    headers = {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
        "Access-Control-Allow-Origin": '*'
    }
    if (auth)
        headers.Authorization = authHeader
    let requestInfo: Record<string, any> = {};
    requestInfo = {
        method: method,
        withCredentials: true,
        headers: headers
    }
    if (method === 'POST' || method === 'PUT')
        requestInfo.body = data

    const redirectToHome = () => {
        const url = ((window.location.protocol !== 'https:' ?
            Constants.DevAPPURL : Constants.APPURL) + '/')
        if (window.location.href !== url) {
            history.push('/')
            history.go(0)
        }
    }

    const fetchdata = fetch(serviceUrl + apiUrl, requestInfo).then(res => {
        if (res.ok) {
            return res.json();
        } else {
            res.text().then(res1 => {
                try {
                    let jsonParseRes1 = JSON.parse(res1)
                    let errorStatus = jsonParseRes1.statusText
                    let responseError = jsonParseRes1.error
                    let error_description = jsonParseRes1.error_description
                    let errorMessage = jsonParseRes1.Message
                    if (errorStatus && errorStatus.toUpperCase() === 'UNAUTHORIZED') {
                        store.dispatch(logoutUser())
                        AlertDialog('Unauthorized Access', redirectToHome)
                    }
                    else if (responseError && responseError.toUpperCase() === 'INVALID_GRANT') {
                        store.dispatch(logoutUser())
                        AlertDialog(error_description, redirectToHome)
                    }
                    else if (errorMessage && errorMessage.toUpperCase() === 'AUTHORIZATION HAS BEEN DENIED FOR THIS REQUEST.') {
                        store.dispatch(logoutUser())
                        AlertDialog(errorMessage, redirectToHome)
                    }
                    else if (errorMessage) {
                        AlertDialog(errorMessage)
                    }
                    return null;
                }
                catch (ex) {
                    if (!errorCatched) {
                        errorCatched = true;
                        let error = ex.toString()
                        let errorInfo = (ex.stack ?? ex.stacktrace ?? '').replace(error, "")
                        var errorData = { "Error": '"' + ex.toString() + '"', "ErrorInfo": JSON.stringify({ componentStack: errorInfo }) }
                        WebApi('/api/Error', JSON.stringify(errorData)).then(resp => {
                            if (!IsNull(resp) && resp.Message === 'SUCCESS') {
                                errorCatched = false
                                AlertDialog(Constants.SupportText + resp.ErrorCode, () => { }, Constants.ErrorHeading)
                            }
                        });
                    }
                    return null;
                }
            }, error => {
                AlertDialog(error.toString())
                return null;
            });
        }
    }
        , error => {
            if (error.toString() === 'TypeError: Failed to fetch') {
                AlertDialog('Employee services are down, please try again later.')
            }
            else {
                AlertDialog(error.toString())
            }
            return null;
        })
    trackPromise(fetchdata)
    return fetchdata;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { GetData, WebApi };