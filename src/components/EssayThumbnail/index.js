import React, { Component } from 'react';
import profile_picture from 'statics/dummy/profile_picture.jpg';
import { classes } from 'common/utils';
import './stylesheet.scss';

class EssayThumbnail extends Component {
  render() {
    const { className } = this.props;

    return (
      <div className={classes('EssayThumbnail', className)}>
        <div className="body">
          <span className="college">Georgia Institute of Technology</span>
          <span className="prompt">Why Georgia Tech?</span>
          <div className="content">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </div>
        </div>
        <div className="head">
          <div className="profile">
            <img className="picture" src={profile_picture} alt="profile"/>
            <span className="name">Daniel</span>
          </div>
          <span className="deadline">Due on <span className="bold">Feb. 1</span></span>
        </div>
      </div>
    );
  }
}

export default EssayThumbnail;
