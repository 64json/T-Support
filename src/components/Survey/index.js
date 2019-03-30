import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions } from 'reducers';
import { Rate } from 'components';
import logoWhiteSquare from 'statics/logo-white-square.png';
import './stylesheet.scss';

class Survey extends Component {
  render() {
    return (
      <div className="Survey">
        <div className="nav">
          <div className="logo" onClick={this.handleReset}>
            <img className="image" src={logoWhiteSquare}/>
            <span className="text">
            - Support
          </span>
          </div>
        </div>
        <span className="label">
            Thank you for contacting our T-Mobile representative. Here is the record.
        </span>
        <span className="balloon question">
            How soon before I can add the global plus one feature to my business account?
        </span>
        <span className="balloon answer">
            Are you asking how soon you can add it after making the account changes? You should be able to get the feature right away.
        </span>
        <span className="label">
            How helpful was our answer to your question?
        </span>
        <Rate className="rate"/>
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(Survey));
