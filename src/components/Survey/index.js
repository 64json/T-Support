import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { actions } from 'reducers';
import { Rate } from 'components';
import { classes } from 'common/utils';
import logoWhiteSquare from 'statics/logo-white-square.png';
import './stylesheet.scss';

class Survey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transcripts: null,
    };
  }

  componentDidMount() {
    axios.get('https://t-support-server.herokuapp.com/transcripts')
      .then(response => {
        const { transcripts } = response.data;
        this.setState({ transcripts });
      });
  }

  render() {
    const { transcripts } = this.state;

    return transcripts && (
      <div className="Survey">
        <div className="nav">
          <div className="logo" onClick={this.handleReset}>
            <img className="image" src={logoWhiteSquare}/>
            <span className="text">- Support</span>
          </div>
        </div>
        <span className="label">
            Thank you for contacting our T-Mobile representative. Here is the record.
        </span>
        {
          transcripts.conversations.map((message, i) => (
            <span key={i}
                  className={classes('balloon', ((i % 2 === 1) ^ (transcripts.firstSpeaker === 1)) ? 'question' : 'answer')}>{message}</span>
          ))
        }
        <span className="label">
            How helpful was our answer to your question?
        </span>
        <Rate className="rate"/>
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(Survey));
