import { config } from "../config";
import { history } from "../_helpers/history";

export const userService = {
  login,
  logout
};

function login(username, password) {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Authorization': 'Basic ' + btoa(`${username}:${password}`),
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'

    },
  };
  return fetch(`${config.apiUrl}/my/account.json`, requestOptions)
    .then( response => {
      if (response.status === 401 ) return Promise.reject('Bad username or password');
      return response.json()
    }).then(data => {
      console.log('data => ', data)
      localStorage.setItem('token', data.user.api_key);
      return data.user;
    })

}

function logout() {
  console.log('function logout() {')
  // remove user from local storage to log user out
  localStorage.removeItem('token');
  history.push('/login');
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}