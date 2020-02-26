function WebApi(apiUrl, data, method = 'POST', auth = true) {
    let authHeader = 'Bearer ' + localStorage.getItem('myToken')

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
    if (method === 'POST')
        requestInfo.body = data

    return fetch('http://employee.service.com' + apiUrl, requestInfo).then(res => {
        if (res.ok) {            
            return res.json();
        } else {
            var error = res.text();
            let errorStatus = res.statusText            
            if(errorStatus.toUpperCase() === 'UNAUTHORIZED'){                
                alert('Session has expired.')
                localStorage.removeItem('myToken')
            }
            throw error;
        }
    }).then(result => {
        return result;
    }, error => { 
        return error;
    })
}

export default WebApi