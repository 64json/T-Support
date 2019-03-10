import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'reducers';
import ReCAPTCHA from 'react-google-recaptcha';
import profile_picture from 'statics/dummy/profile_picture.jpg';
import { recaptchaSiteKey } from 'common/constants';
import { Button, Dialog, Field, Page } from 'components';
import './stylesheet.scss';

class Join extends Page {
  handleSubmit = e => {
    e.preventDefault();
    this.props.setUser({
      picture: profile_picture,
      name: 'Daniel Stern',
    });
  };

  renderPage() {
    const { user } = this.props.env;

    return (
      user ? <Redirect to="/"/> :
        <div className="Join">
          <Dialog className="dialog" onSubmit={this.handleSubmit}>
            <Field label="Email">
              <input type="email"/>
            </Field>
            <Field label="Password">
              <input type="password"/>
            </Field>
            <Field label="First Name">
              <input type="text"/>
            </Field>
            <Field label="Last Name" optional>
              <input type="text"/>
            </Field>
            <Field label="Date of Birth" optional>
              <input type="date"/>
            </Field>
            <Field label="Region" optional>
              <select>
                <option></option>
                <option>Northeast</option>
                <option>Midwest</option>
                <option>South</option>
                <option>West</option>
                <option>Puerto Rico and other US territories</option>
                <option>International</option>
              </select>
            </Field>
            <Field className="recaptcha">
              <ReCAPTCHA sitekey={recaptchaSiteKey}/>
            </Field>
            <Button>Join</Button>
          </Dialog>
        </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(Join));
