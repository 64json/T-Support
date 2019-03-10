import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'reducers';
import profile_picture from 'statics/dummy/profile_picture.jpg';
import { Button, Dialog, Field } from 'components';
import './stylesheet.scss';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.setUser({
      picture: profile_picture,
      name: 'Daniel Stern',
    });
  };

  render() {
    const { user } = this.props.env;

    return (
      user ? <Redirect to="/"/> :
        <div className="Login">
          <Dialog className="dialog" onSubmit={this.handleSubmit}>
            <Button className="linkedIn" icon={faLinkedin}>Sign in with LinkedIn</Button>
            <div className="divider"/>
            <Field label="Email">
              <input type="text"/>
            </Field>
            <Field label="Password">
              <input type="password"/>
            </Field>
            <Button>Login</Button>
            <Link className="link" to="/join">
              Create an account.
            </Link>
          </Dialog>
        </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(Login));
