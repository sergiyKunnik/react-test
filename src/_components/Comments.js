import React from 'react';
import { connect } from 'react-redux';
import { LoaderComponent } from './Loader';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { commentsActions } from '../redux/actions/comments.actions';
class CommentsComponent extends React.Component {
  state = {
    text: ''
  }

  componentDidMount() {
    this.props.dispatch(commentsActions.getAll(this.props.projectId));
  }

  createComment() {
    this.props.dispatch(commentsActions.create(this.props.projectId, this.state.text));
    this.setState({ text: '' })
  }
  render() {
    const comments = this.props.comments;
    if (comments.loading) {
      return <LoaderComponent />
    }

    return (
      <div className="">
        {comments.list.map(comment => {
          return (
            <div>
              <p>{comment.text} </p>
            </div>
          )
        })}


        <h5>Create Comment</h5>
        {comments.error ? (
          <Alert variant='danger'>
            Error while creating comment
          </Alert>
        ) : (<div> </div>)}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Your comment</Form.Label>
          <Form.Control as="textarea" rows="3" onChange={(text) => this.setState({ text: text.target.value })} value={this.state.text} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={() => this.createComment()}>
          Create comment
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { comments } = state;
  return {
    comments,
  };
}

const connectedCommentsComponent = connect(mapStateToProps)(CommentsComponent);
export { connectedCommentsComponent as CommentsComponent };