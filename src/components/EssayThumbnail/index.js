import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile_picture_0 from 'statics/dummy/profile_picture_0.jpg';
import profile_picture_1 from 'statics/dummy/profile_picture_1.jpg';
import profile_picture_2 from 'statics/dummy/profile_picture_2.jpg';
import { classes } from 'common/utils';
import { LOREM } from 'common/dummies';
import './stylesheet.scss';

class EssayThumbnail extends Component {
  render() {
    const { className, decision } = this.props;

    return (
      <Link className={classes('EssayThumbnail', className)} to="/essay/loremipsum">
        <div className="body">
          <span className="college">Georgia Institute of Technology</span>
          <span className="prompt">Why Georgia Tech?</span>
          <div className="content">{LOREM}</div>
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
              <span className="name">Keira</span>
              <span className="name">Jackie</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default EssayThumbnail;
