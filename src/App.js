import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { alertActions } from './redux/actions/alert.actions';
import { PrivateRoute } from './_components/PrivateRoute';
import { history } from './_helpers/history';
import { ProjectDetail } from './pages/ProjectDetail';
class App extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    history.listen((location, action) => {
      dispatch(alertActions.clear());
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <div>
            <PrivateRoute exact path="/" component={HomePage} />
            <PrivateRoute path="/project/:projectId" component={ProjectDetail} />
            <Route path="/login" component={LoginPage} />
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
    alert
  };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 