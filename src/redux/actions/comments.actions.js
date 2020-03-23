
import { commentsConstants } from "../constants/comments.constants";
import { commentsService } from "../../_services/comments.service";


export const commentsActions = {
  getAll,
  create,
};


function getAll(projectId) {
  return dispatch => {
    dispatch(request());
    try {
      const comments = commentsService.getAll(projectId);
      dispatch(success(comments))
    } catch (error) {
      dispatch(failure(error))
    }
  };
  function request() { return { type: commentsConstants.COMMENTS_LIST_REQUEST } }
  function success(data) { return { type: commentsConstants.COMMENTS_LIST_SUCCESS, data } }
  function failure(error) { return { type: commentsConstants.COMMENTS_LIST_ERROR, error } }
}


function create(projectId, text) {
  return dispatch => {
    dispatch(request());
    try {
      console.log('function create')
      const comment = commentsService.create(projectId, text);
      console.log('dispatch(success(comment)) => ', )
      dispatch(success(comment))
    } catch (error) {
      dispatch(failure(error))
    }
  };
  function request() { return { type: commentsConstants.COMMENT_CREATE_REQUEST } }
  function success(data) { return { type: commentsConstants.COMMENT_CREATE_SUCCESS, data } }
  function failure(error) { return { type: commentsConstants.COMMENT_CREATE_ERROR, error } }
}
