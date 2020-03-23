import { projectsService } from "../../_services/projects.service";
import { projectConstants } from "../constants/project.constants";


export const projectsActions = {
  getAll,
  detail,
};


function getAll() {
  return dispatch => {
    projectsService.getAll()
      .then(
        data => dispatch(success(data)),
        error => dispatch(failure(error))
      );
  };
  function success(data) { return { type: projectConstants.PROJECTS_LIST_SUCCESS, data } }
  function failure(error) { return { type: projectConstants.PROJECTS_LIST_FAILURE, error } }
}

function detail(projectId) {
  return dispatch => {
    projectsService.getById(projectId)
      .then( async projectResponse => {
        return dispatch(success(projectResponse))
      })
      .catch(error => {
        console.log('error => ', error);
        return dispatch(failure(error))
      })
  };

  function success(data) { return { type: projectConstants.PROJECT_DETAIL_SUCCESS, data } }
  function successWithinIssues(data) { return { type: projectConstants.PROJECT_DETAIL_SUCCESS_WITHIN_ISSUES, data } }
  function failure(error) { return { type: projectConstants.PROJECT_DETAIL_FAILURE, error } }

}