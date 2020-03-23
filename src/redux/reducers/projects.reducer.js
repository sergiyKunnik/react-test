import { projectConstants } from "../constants/project.constants";


const initialState = {
  projects: [],
  total_count: 0,
  offset: 0,
  limit: 0,
  project_detail: {
    loading: true,
    getIssuesError: false,
    project: {},
    comments: {
      loading: true,
      list: []
    }
  }
};

export function projects(state = initialState, action) {
  switch (action.type) {
    case projectConstants.PROJECTS_LIST_SUCCESS:
      return { ...state, ...action.data };
    case projectConstants.PROJECTS_LIST_FAILURE:
      return {
        ...state,
        projects: []
      };
      case projectConstants.PROJECT_DETAIL_SUCCESS:
        return {
          ...state,
          project_detail: {
            ...state.project_detail,
            loading: false,
            ...action.data,
          }
        }
        case projectConstants.PROJECT_DETAIL_SUCCESS_WITHIN_ISSUES:
          return {
            ...state,
            project_detail: {
              ...state.project_detail,
              getIssuesError: true,
              loading: false,
              ...action.data,
            }
          }
      
      case projectConstants.PROJECT_DETAIL_FAILURE:
        return {
          ...state,
          project_detail: {
            ...state.project_detail,
            loading: true
          }
        }
    default:
      return state
  }
}