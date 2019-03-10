import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenNib } from '@fortawesome/free-solid-svg-icons';
import { Home } from 'components';
import { classes } from 'common/utils';
import profile_picture from 'statics/dummy/profile_picture.jpg';
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
              Upload Essay
            </Link>
            <Link className="item" to="/review">
              Review Essay
            </Link>
            <Link className="item" to="/essays">
              Example Essays
            </Link>
            <Link className="item" to="/forum">
              College Forum
            </Link>
          </div>
          <Link className="profile" to="/profile">
            <img className="picture" src={profile_picture} alt="profile"/>
            <span className="name">Daniel Stern</span>
          </Link>
        </header>
        <div className="page">
          <Route exact path="/" component={Home}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
