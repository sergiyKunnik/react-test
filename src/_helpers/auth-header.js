export function authHeader() {
    let token = localStorage.getItem('token');

    if (token) {
        return {
          'X-Redmine-API-Key': token,
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'

        };
    } else {
        return {};
    }
}