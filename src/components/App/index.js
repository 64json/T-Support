import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Route, Switch, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { Essay, Home, Join, Login, NotFound, Review, Sample, Upload, User } from 'pages';
import { Profile } from 'components';
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
    const { user } = this.props.env;
    const { pathname } = nextProps.location;
    const { scrollTop } = document.documentElement;
    const sticky = !!user || pathname !== '/' || scrollTop > 64;
    this.setState({ sticky });
  }

  render() {
    const { user } = this.props.env;
    const { pathname } = this.props.location;
    const { sticky } = this.state;

    return (
      <div className="App">
        <header className={classes('navigation', sticky && 'sticky')}>
          <Link className="logo" to="/">
            <FontAwesomeIcon className="icon" icon={faPenNib}/>
            <span className="title">BestForLast</span>
          </Link>
          <div className="menu">
            {
              [
                ['Upload an Essay', '/upload'],
                ['Review an Essay', '/review'],
                ['Sample Essays', '/sample'],
                ['College Forum', '/forum'],
              ].map(([menu, to]) => (
                <Link className={classes('item', pathname.startsWith(to) && 'selected')} to={to}>{menu}</Link>
              ))
            }
          </div>
          {
            user ?
              <Profile user={user}/> :
              <Link className="login" to="/login">
                <FontAwesomeIcon className="icon" icon={faLock}/>
                <span className="label">Login</span>
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
            <Route exact path="/essay/:essayId" component={Essay}/>
            <Route exact path="/essay/:essayId/:editorId" component={Essay}/>
            <Route exact path="/user/:userId" component={User}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(({ env }) => ({ env }), actions)(App));
