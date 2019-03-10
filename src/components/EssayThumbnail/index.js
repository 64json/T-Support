import React, { Component } from 'react';
import profile_picture_0 from 'statics/dummy/profile_picture_0.jpg';
import profile_picture_1 from 'statics/dummy/profile_picture_1.jpg';
import profile_picture_2 from 'statics/dummy/profile_picture_2.jpg';
import { classes } from 'common/utils';
import './stylesheet.scss';

class EssayThumbnail extends Component {
  render() {
    const { className, decision } = this.props;

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
          <div className="applicant">
            <div className="profile">
              <img className="picture" src={profile_picture_0} alt="profile"/>
              <span className="name">Daniel</span>
            </div>
            {
              decision ?
                <span className={classes('decision', decision)}>{decision}</span> :
                <span className="deadline">Feb. 1</span>
            }
          </div>
          <div className="reviewer">
            <div className="profile">
              <img className="picture" src={profile_picture_1} alt="profile"/>
              <img className="picture" src={profile_picture_2} alt="profile"/>
              <span className="name">Chris</span>
              <span className="name">Yukt</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EssayThumbnail;
