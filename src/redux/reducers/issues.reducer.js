import { issuesConstants } from "../constants/issues.constants";

const initialState = {
  loading: false,
  list: [],
};

export function issues(state = initialState, action) {
  switch (action.type) {
    case issuesConstants.ISSUES_LIST_REQUEST:
      return {
        loading: true,
        list: []
      };
    case issuesConstants.ISSUES_LIST_SUCCESS:
      console.log('action => ', action)
      return {
        loading: false,
        list: action.data.issues
      };
    case issuesConstants.ISSUES_LIST_ERROR:
      return {
        loading: false,
        lists: []
      };
    default:
      return state
  }
}