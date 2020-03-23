import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { userActions } from '../redux/actions/user.actions';
class HeaderComponent extends React.Component {
  logout() {
    this.props.dispatch(userActions.logout())
  }
  render() {

    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Navbar.Brand href="/">All projects</Navbar.Brand>
          </Nav>
          <Button variant="outline-danger" onClick={() => this.logout()}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  const { authentication } = state;
  return {
    authentication
  };
}

const connectedHeaderComponent = connect(mapStateToProps)(HeaderComponent);
export { connectedHeaderComponent as HeaderComponent };