import { commentsConstants } from "../constants/comments.constants";

const initialState = {
  loading: false,
  error: false,
  list: [],
};

export function comments(state = initialState, action) {
  switch (action.type) {
    case commentsConstants.COMMENT_CREATE_REQUEST:
      return state;
    case commentsConstants.COMMENT_CREATE_ERROR:
      return { ...state, error: true };
    case commentsConstants.COMMENT_CREATE_SUCCESS:
      return {
        loading: false,
        error: false,
        list: [...state.list, action.data]
      };


    case commentsConstants.COMMENTS_LIST_REQUEST:
      return {
        loading: true,
        error: false,
        list: []
      };
    case commentsConstants.COMMENTS_LIST_SUCCESS:
      return {
        loading: false,
        error: false,
        list: action.data
      };
    case commentsConstants.COMMENTS_LIST_ERROR:
      return {
        loading: false,
        error: true,
        list: []
      };
    default:
      return state
  }
}