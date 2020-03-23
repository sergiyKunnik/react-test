import { authHeader } from '../_helpers/auth-header';
import { config } from '../config';

export const projectsService = {
  getAll,
  getById,
  getProjectIssues,
  getIssuesByTracker,
};

function getAll() {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };

  return fetch(`${config.apiUrl}/projects.json`, requestOptions)
    .then(response => {
      return response.json()
    })
    .then(data => {
      data.projects = data.projects.filter(project => project.status === 1)
      return data;
    })
}

function getById(projectId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/projects/${projectId}.json?include=trackers`, requestOptions)
    .then(response => response.json())
    .then(async projectResponse => {
      try {
        const table = {
        }
        const allStatuses = {};
        const filterIssuesByStatuses = (issues) => {
          const data = {};
          for (const issue of issues) {
            if(!data[issue.status.id.toString()]) {
              allStatuses[issue.status.id.toString()] = {
                name: issue.status.name,
                id: issue.status.id
              };
              data[issue.status.id.toString()] = {
                name: issue.status.name,
                id: issue.status.id,
                list: [],
              }
            }
            data[issue.status.id].list.push(issue);
          }
          return data;
        }
        for (let tracker of projectResponse.project.trackers) {
          const issuesByTracker = await getIssuesByTracker(projectResponse.project.id, tracker.id);
          const filteredByStatuses = filterIssuesByStatuses(issuesByTracker.issues);
  
          table[tracker.name] = {
            tracker: {
              id: tracker.id,
              name: tracker.name
            },
            statuses: filteredByStatuses,
          }
        }
        for(let tracker_status in allStatuses) {
          for(let tableItem in table) {
            if(!Object.keys(table[tableItem].statuses).includes(tracker_status.toString())) {
              table[tableItem].statuses[tracker_status.toString()] = {...allStatuses[tracker_status.toString()], list: []};
            }
          }
        }
        projectResponse.project.tracker_table = table;
      } catch (error) {
        projectResponse.getIssuesError = true;
      }
      return projectResponse;
    })
}

function getProjectIssues(productId) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/projects/${productId}/issues.json`, requestOptions)
    .then(response => response.json())
    .then(data => {
      return data;
    })
}
function getIssuesByTracker(productId, tracker_id) {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  };
  return fetch(`${config.apiUrl}/issues.json?project_id=${productId}&tracker_id=${tracker_id}&status_id=%2A`, requestOptions)
  .then(response => response.json())
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