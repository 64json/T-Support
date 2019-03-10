import React, { Component } from 'react';
import './stylesheet.scss';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'reducers';
import profile_picture from 'statics/dummy/profile_picture.jpg';

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
          <form className="container" onSubmit={this.handleSubmit}>
            <label className="field">
              <span className="label">Email</span>
              <input type="text"/>
            </label>
            <label className="field">
              <span className="label">Password</span>
              <input type="password"/>
            </label>
            <button className="button">Login</button>
            <Link className="link" to="/join">
              Create an account.
            </Link>
          </form>
        </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(Login));
