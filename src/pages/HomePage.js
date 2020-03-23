import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { projectsActions } from '../redux/actions/projects.actions';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { HeaderComponent } from '../_components/Header';
class HomePage extends React.Component {
  componentDidMount() {
    // this.props.dispatch(userActions.getAll());
    this.props.dispatch(projectsActions.getAll());
  }

  render() {
    const { projects } = this.props;
    return (
      <div>
        <HeaderComponent />

      <div className="row container" style={{margin:40}}>
        {projects.projects.map(function (project, index) {

          return (
            <Card style={{ width: '18rem', margin: '10px' }}>
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Created: {moment(project.created_on).fromNow()}</Card.Subtitle>
                <Card.Link href={`/project/${project.identifier}`} >Detail</Card.Link>
              </Card.Body>
            </Card>
          )
        })}
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects } = state;
  // const { user } = authentication;
  return {
    projects
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };