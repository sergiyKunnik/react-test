import { issuesConstants } from "../constants/issues.constants";
import { issuesService } from "../../_services/issues.service";


export const issuesActions = {
  filter,
};


function filter(projectId, {tracker_id, status_id}) {
  return dispatch => {
    dispatch(request());
    issuesService.filter(projectId, {tracker_id, status_id})
      .then(
        data => dispatch(success(data)),
        error => dispatch(failure(error))
      );
  };
  function request() { return { type: issuesConstants.ISSUES_LIST_REQUEST } }
  function success(data) { return { type: issuesConstants.ISSUES_LIST_SUCCESS, data } }
  function failure(error) { return { type: issuesConstants.ISSUES_LIST_ERROR, error } }
}
