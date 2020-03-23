import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as moment from 'moment';
import { projectsActions } from '../redux/actions/projects.actions';
import { Card, Button, Container, Row, Col, Table, Alert } from 'react-bootstrap';
import { LoaderComponent } from '../_components/Loader';
import { IssuesComponent } from '../_components/Issues';
import { issuesActions } from '../redux/actions/issues.actions';
import { CommentsComponent } from '../_components/Comments';
class ProjectDetail extends React.Component {
  componentDidMount() {
    const params = this.props.match.params;
    this.props.dispatch(projectsActions.detail(params.projectId));

    console.log('params => ', params)
  }
  getListOfIssues(filter) {
    this.props.dispatch(issuesActions.filter(this.props.match.params.projectId, filter))
  }
  renderTableHeader() {
    const item_key = Object.keys(this.props.projects.project_detail.project.tracker_table)[0];
    const item = this.props.projects.project_detail.project.tracker_table[item_key];
    console.log('item => ', item)
    return (
      <tr key={'header'}>
        <th></th>
        {Object.keys(item.statuses).sort().map(status_key => {
          return <th>{item.statuses[status_key].name}</th>
        })}
        <th>Total</th>
      </tr>
    )
  }

  renderTableData() {
    return Object.keys(this.props.projects.project_detail.project.tracker_table).map((tracker_table_item_key, index) => {
      const item = this.props.projects.project_detail.project.tracker_table[tracker_table_item_key];
      let all = 0;
      return (
        <tr key={item.tracker.id}>
          <td><Link onClick={() => this.getListOfIssues({
            tracker_id: item.tracker.id,
            status_id: '%2A'
          })}>{item.tracker.name}</Link></td>
          {Object.keys(item.statuses).sort().map(status_key => {
            const count = item.statuses[status_key].list.length;
            all += count;
            return <td><Link onClick={() => this.getListOfIssues({
              status_id: item.statuses[status_key].id,
              tracker_id: item.tracker.id,
            })}>{count}</Link></td>
          })}
          <td><Link onClick={() => this.getListOfIssues({
            tracker_id: item.tracker.id,
            status_id: '%2A'
          })}>{all}</Link></td>
        </tr>
      )
    })
  }
  render() {
    const { projects } = this.props;
    const project = projects.project_detail.project;
    if (projects.project_detail.loading) {
      return <LoaderComponent />
    }

    return (
      <Container className="container">
        <Row>
          <Col>
            <h2>{project.name}</h2>
            <h4>Overview: </h4>
            <ul>
              {project.custom_fields
                .filter(custom_field => custom_field.name && custom_field.value)
                .map(custom_field => {
                  if (custom_field.value === '0') custom_field.value = 'NO'
                  if (custom_field.value === '1') custom_field.value = 'YES'
                  return (
                    <li>
                      {custom_field.name} => {custom_field.value}
                    </li>
                  )
                })}
            </ul>
            {projects.project_detail.getIssuesError ? (
              <Alert variant='danger'>
              You have not acces for get issues
            </Alert>
            ) : (
              <div>
            <h4>Tracker: </h4>

          <Table striped bordered hover>
            <thead>
              {this.renderTableHeader()}
            </thead>
            <tbody>
              {this.renderTableData()}
            </tbody>
          </Table>
            </div>
            )}
            <h3>Comments</h3>
        <CommentsComponent projectId={this.props.match.params.projectId}/>
          </Col>
      <Col>
        <IssuesComponent />
      </Col>
        </Row >
      </Container >
    )
  }
}

function mapStateToProps(state) {
  const { projects, issues } = state;
  return {
    projects,
    issues
  };
}

const connectedProjectDetail = connect(mapStateToProps)(ProjectDetail);
export { connectedProjectDetail as ProjectDetail };