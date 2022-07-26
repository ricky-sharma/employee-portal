import { WebApi } from './WebApi.ts';

function GetUserInfo(id) {
    let url = id === 0 ? `/api/Account/UserInfo` : '/api/Account/UserInfo/' + id
    return WebApi(url, '', 'GET')
        .then(response => {
            if (response) {
                var jsonResponse = {
                    UserName: response.UserName ? response.UserName : "",
                    UserId: response.UserId ? response.UserId : "",
                    Email: response.Email ? response.Email : "",
                    Phone: response.Phone ? response.Phone : ""
                };
                url = id === 0 ? `/api/AspNetUserInfoes/` + response.UserId : `/api/AspNetUserInfoes/` + id
                return WebApi(url, '', 'GET')
                    .then(response => {
                        if (response) {
                            jsonResponse.Id = response.Id
                            jsonResponse.FirstName = response.FirstName
                            jsonResponse.LastName = response.LastName
                            jsonResponse.Gender = response.Gender
                            jsonResponse.DOB = response.DOB !== null ? new Date(response.DOB) : ''
                            jsonResponse.FullName = response.FirstName + ' ' + response.LastName
                            return jsonResponse
                        }
                    })
                return jsonResponse
            }
            return null;
        });
}

export default GetUserInfo