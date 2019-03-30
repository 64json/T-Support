import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { actions } from 'reducers';
import logoWhiteSquare from 'statics/logo-white-square.png';
import logoMagentaSquare from 'statics/logo-magenta-square.png';
import { capitalize, classes, similarity } from 'common/utils';
import { QUESTIONS } from 'common/dummies';
import { Rate } from 'components';
import 'font-awesome/css/font-awesome.min.css';
import './stylesheet.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyword: '',
      search: '',
      questionId: '',
      representativeId: '',
      password: '',
      login: '',
      loading: false,
      officialSearch: null,
      communitySearch: null,
    };

    this.searchRef = React.createRef();
  }

  componentDidMount() {
    axios.get('https://t-support-server.herokuapp.com/transcripts')
      .then(response => {
        const { firstSpeaker, conversations } = response.data.transcripts;
        axios.get('https://t-support-server.herokuapp.com/rates')
          .then(response => {
            const { rates } = response.data;

            let primaryAnswer = '';
            for (let i = firstSpeaker % 2; i < conversations.length; i += 2) {
              const answer = conversations[i];
              if (primaryAnswer.length < answer.length) {
                primaryAnswer = answer;
              }
            }

            let primaryQuestion = '';
            for (let i = firstSpeaker - 1; i < conversations.indexOf(primaryAnswer); i += 2) {
              const question = conversations[i];
              if (primaryQuestion.length < question.length) {
                primaryQuestion = question;
              }
            }
            QUESTIONS.push({
              id: 'q-demo',
              category: ([
                  ['Devices > Android Products', ['android', 'google']],
                  ['Devices > Apple Products', ['iphone', 'apple']],
                  ['Devices > Other Products', ['phone', 'mobile', 'model']],
                  ['Services > Network & Coverage', ['network', 'coverage', 'roaming']],
                ].find(([category, keywords]) => keywords.some(keyword => primaryQuestion.includes(keyword))) ||
                ['Services > Account & Services'])[0],
              text: capitalize(primaryQuestion.replace(/^(a|hello|hi|hey|good|great|sarah|fine|morning|afternoon|evening|night|doing|ok|i|m|am|how|are|you|\W)+[?!. ]+/i, '')),
              answers: [{
                id: 'a-demo',
                text: primaryAnswer,
                count: 1,
                customerRating: rates,
                representativeRating: 0,
                rating: rates,
              }],
            });
          });
      });
  }

  delay = callback => {
    this.setState({ loading: true });
    window.setTimeout(() => {
      this.setState({ loading: false });
      callback();
    }, Math.random() * 400 + 200);
  };

  handleChangeKeyword = e => {
    const keyword = e.target.value;
    const similarities = QUESTIONS.map(q => similarity(keyword, q.text));
    QUESTIONS.sort((q1, q2) => similarities[QUESTIONS.indexOf(q1)] - similarities[QUESTIONS.indexOf(q2)]);
    this.setState({ keyword });
  };

  handleReset = () => {
    this.setState({
      keyword: '',
      search: '',
      questionId: '',
    });
  };

  handleSearch = e => {
    e.preventDefault();
    this.searchRef.current.blur();
    const search = this.state.keyword;
    this.setState({ loading: true, officialSearch: null });
    axios.get(`https://t-support-server.herokuapp.com/search/official?q=${encodeURIComponent(search)}`)
      .then(response => {
        const [officialSearch] = response.data.list;
        this.setState({ loading: false, search, questionId: '', officialSearch });
      });
  };

  handleClickQuestionCard = questionId => {
    this.setState({ loading: true, communitySearch: null });
    axios.get(`https://t-support-server.herokuapp.com/search/community?q=${encodeURIComponent(this.state.search)}`)
      .then(response => {
        const [communitySearch] = response.data.list;
        this.setState({ loading: false, questionId, communitySearch });
      });
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
    this.delay(() => {
      const login = this.state.representativeId;
      this.setState({ login });
    });
  };

  render() {
    const { keyword, search, questionId, representativeId, password, login, loading, officialSearch, communitySearch } = this.state;

    const question = QUESTIONS.find(q => q.id === questionId);

    return (
      <div className={classes('App', (!login || !search) && 'no-scroll')}>
        <form className={classes('nav', search && 'top')} onSubmit={this.handleSearch}>
          <div className="logo" onClick={this.handleReset}>
            <img className="image" src={logoWhiteSquare}/>
            <span className="text">- Support</span>
          </div>
          <input className="search" type="text" value={keyword} onChange={this.handleChangeKeyword}
                 placeholder="Search a topic" ref={this.searchRef}/>
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
                officialSearch &&
                <a className="official" href={officialSearch.resources.html.ref} target="_blank">
                  <img className="avatar" src={officialSearch.resources.avatar.ref}/>
                  <span className="name">{officialSearch.name}</span>
                  <span className="description">{officialSearch.description}</span>
                </a>
              }
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
              question.answers.map(({ id, text, count, representativeRating, customerRating }) => [
                <div className="answer" key={id}>
                  <span className="frequency">{count} representatives answered like</span>
                  <span className="text">{text}</span>
                  <div className="ratingContainer">
                    <div className="rate">
                      <span className="label">How informative is it?</span>
                      <Rate/>
                    </div>
                    <div className="ratings">
                      <span className="rating">
                        <b>Customers</b> rated <FontAwesomeIcon className="star"
                                                                icon={faStar}/><b>{customerRating ? customerRating.toFixed(1) : 'N/A'}</b>
                      </span>
                      <span className="rating">
                        <b>Representatives</b> rated <FontAwesomeIcon className="star"
                                                                      icon={faStar}/><b>{representativeRating ? representativeRating.toFixed(1) : 'N/A'}</b>
                      </span>
                    </div>
                  </div>
                </div>,
                <div className="divider-dim" key={`${id}-divider`}/>,
              ])
            }
            {
              communitySearch &&
              <a className="search" href={communitySearch.resources.html.ref} target="_blank">
                <span className="subject">{communitySearch.subject}</span>
                <span className="link">{communitySearch.resources.html.ref}</span>
                <span className="body" dangerouslySetInnerHTML={{ __html: communitySearch.highlightBody }}/>
              </a>
            }
          </div>
        }
        {
          !login &&
          <form className="login" onSubmit={this.handleLogin}>
            <div className="logo" onClick={this.handleReset}>
              <img className="image" src={logoMagentaSquare}/>
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
        <div className={classes('loading', loading && 'active', login ? 'white' : 'magenta')}/>
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(App));
