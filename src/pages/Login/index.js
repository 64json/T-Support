import React from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { connect } from 'react-redux';
import { actions } from 'reducers';
import { Button, Dialog, Field, Page } from 'components';
import { USERS } from 'common/dummies';
import './stylesheet.scss';

class Login extends Page {
  handleSubmit = e => {
    e.preventDefault();
    this.props.setUser(USERS[0]);
  };

  renderPage() {
    const { user } = this.props.env;

    return user ? <Redirect to="/"/> : (
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
