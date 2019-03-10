import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { Home, Join, Login, NotFound, Review, Sample, Upload } from 'pages';
import { classes } from 'common/utils';
import { actions } from 'reducers';
import './stylesheet.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sticky: false,
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.updateSticky();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.updateSticky();
  };

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.updateSticky(nextProps);
    }
  }

  updateSticky(nextProps = this.props) {
    const { pathname } = nextProps.location;
    const { scrollTop } = document.documentElement;
    const sticky = pathname !== '/' || scrollTop > 64;
    this.setState({ sticky });
  }

  render() {
    const { user } = this.props.env;
    const { sticky } = this.state;

    return (
      <div className="App">
        <header className={classes('navigation', sticky && 'sticky')}>
          <Link className="logo" to="/">
            <FontAwesomeIcon className="icon" icon={faPenNib}/>
            <span className="title">BestForLast</span>
          </Link>
          <div className="menu">
            <Link className="item" to="/upload">
              Upload an Essay
            </Link>
            <Link className="item" to="/review">
              Review an Essay
            </Link>
            <Link className="item" to="/sample">
              Sample Essays
            </Link>
            <Link className="item" to="/forum">
              College Forum
            </Link>
          </div>
          {
            user ?
              <Link className="profile" to="/profile">
                <img className="picture" src={user.picture} alt="profile"/>
                <span className="name">{user.name}</span>
              </Link> :
              <Link className="profile" to="/login">
                <FontAwesomeIcon className="icon" icon={faLock}/>
                <span className="name">Login</span>
              </Link>
          }
        </header>
        <div className="page">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/join" component={Join}/>
            <Route exact path="/upload" component={Upload}/>
            <Route exact path="/review" component={Review}/>
            <Route exact path="/sample" component={Sample}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(App));
