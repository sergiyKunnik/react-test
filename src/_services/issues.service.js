import { authHeader } from '../_helpers/auth-header';
import { config } from '../config';

export const issuesService = {
  filter,
};

function filter(projectId, {tracker_id, status_id}) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  let requestUrl = `${config.apiUrl}/projects/${projectId}/issues.json?set_filter=1`;
  if(tracker_id) requestUrl+=`&tracker_id=${tracker_id}`;
  if(status_id) requestUrl+=`&status_id=${status_id}`;
  return fetch(requestUrl, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {
      return data;
    })
}


// function handleResponse(response) {
//   return response.text().then(text => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         logout();
//         location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }