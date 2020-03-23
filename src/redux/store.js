import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authentication } from './reducers/authentication.reducer'
import { users } from './reducers/users.reducer';
import { alert } from './reducers/alert.reducer';
import { projects } from './reducers/projects.reducer';
import { issues } from './reducers/issues.reducer';
import { comments } from './reducers/comments.reducer';

export const store = createStore(
  combineReducers({
    authentication,
    users,
    alert,
    projects,
    issues,
    comments
  }),
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
);