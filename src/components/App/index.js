import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { actions } from 'reducers';
import './stylesheet.scss';
import logoWhiteSquare from 'statics/logo-white-square.png';
import { classes } from 'common/utils';
import { QUESTIONS } from 'common/dummies';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class App extends Component {
  constructor(props) {
    super(props);

    this.initialState = {
      keyword: '',
      search: '',
      questionId: undefined,
      representativeId: '',
      password: '',
      login: '',
    };

    this.state = this.initialState;
  }

  handleChangeKeyword = e => {
    const keyword = e.target.value;
    this.setState({ keyword });
  };

  handleReset = () => {
    this.setState(this.initialState);
  };

  handleSearch = e => {
    e.preventDefault();
    const search = this.state.keyword;
    this.setState({ search });
  };

  handleClickQuestionCard = questionId => {
    this.setState({ questionId });
  };

  handleChangeRepresentativeId = e => {
    const representativeId = e.target.value;
    this.setState({ representativeId });
  };

  handleChangePassword = e => {
    const password = e.target.value;
    this.setState({ password });
  };

  handleLogin = e => {
    e.preventDefault();
    const login = this.state.representativeId;
    this.setState({ login });
  };

  render() {
    const { keyword, search, questionId, representativeId, password, login } = this.state;

    const question = QUESTIONS.find(q => q.id === questionId);

    return (
      <div className="App">
        <form className={classes('nav', search && 'top')} onSubmit={this.handleSearch}>
          <div className="logo" onClick={this.handleReset}>
            <img className="image" src={logoWhiteSquare}/>
            <span className="text">
            - Support
          </span>
          </div>
          <input className="search" type="text" value={keyword} onChange={this.handleChangeKeyword}
                 placeholder="Search a topic"/>
        </form>
        {
          question ?
            <div className="question-selected">
              <div className="wrapper">
                <span className="category">{question.category}</span>
                <span className="question">{question.text}</span>
              </div>
            </div> :
            <div className="questions">
              {
                QUESTIONS.map(({ id, category, text, answers }) => (
                  <div className="question-card" key={id} onClick={() => this.handleClickQuestionCard(id)}>
                    <span className="category">{category}</span>
                    <span className="question">{text}</span>
                    <div className="divider"/>
                    {
                      answers.map(({ id, text }) => [
                        <span className="answer" key={id}>{text}</span>,
                        <div className="divider-dim" key={`${id}-divider`}/>,
                      ])
                    }
                  </div>
                ))
              }
            </div>
        }
        {
          question &&
          <div className="answers">
            {
              question.answers.map(({ id, text }) => [
                <div className="answer" key={id}>
                  <span className="frequency">5 representatives answered like</span>
                  <span className="text">{text}</span>
                  <div className="ratingContainer">
                    <div className="rate">
                      {
                        new Array(5).fill(0).map((_, i) => (
                          <FontAwesomeIcon icon={faStar} className={classes('star', i < 3 && 'selected')} key={i}/>
                        ))
                      }
                    </div>
                    <div className="ratings">
                      <span className="rating">
                        <b>Representatives</b> rated <FontAwesomeIcon className="star" icon={faStar}/><b>4.7</b>
                      </span>
                      <span className="rating">
                        <b>Customers</b> rated <FontAwesomeIcon className="star" icon={faStar}/><b>4.3</b>
                      </span>
                    </div>
                  </div>
                </div>,
                <div className="divider-dim" key={`${id}-divider`}/>,
              ])
            }
          </div>
        }
        {
          !login &&
          <form className="login" onSubmit={this.handleLogin}>
            <div className="logo" onClick={this.handleReset}>
              <img className="image" src={logoWhiteSquare}/>
              <span className="text">
              - Support
            </span>
            </div>
            <input className="input" type="text" value={representativeId} onChange={this.handleChangeRepresentativeId}
                   placeholder="Representative ID"/>
            <input className="input" type="password" value={password} onChange={this.handleChangePassword}
                   placeholder="Password"/>
            <button className="button">Login</button>
          </form>
        }
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(App));
