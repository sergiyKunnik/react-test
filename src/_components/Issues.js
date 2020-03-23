import React from 'react';
import { connect } from 'react-redux';
import { LoaderComponent } from './Loader';
import { ListGroup } from 'react-bootstrap';
class IssuesComponent extends React.Component {
  render() {
    const issues = this.props.issues;
    if(issues.loading) {
      return <LoaderComponent />
    }
    return (
      <div>
        <ListGroup>
          {issues.list.map(issue => {
            return (
            <ListGroup.Item>{issue.subject}</ListGroup.Item>
            )
          })}
        </ListGroup>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { projects, issues } = state;
  return {
    projects,
    issues
  };
}

const connectedIssuesComponent= connect(mapStateToProps)(IssuesComponent);
export { connectedIssuesComponent as IssuesComponent };