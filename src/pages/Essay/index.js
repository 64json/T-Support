import React from 'react';
import { Page } from 'components';
import profile_picture_0 from 'statics/dummy/profile_picture_0.jpg';
import profile_picture_1 from 'statics/dummy/profile_picture_1.jpg';
import profile_picture_2 from 'statics/dummy/profile_picture_2.jpg';
import { LOREM } from 'common/dummies';
import './stylesheet.scss';

class Essay extends Page {
  renderPage() {
    return (
      <div className="Essay">
        <div className="body">
          <span className="college">Georgia Institute of Technology</span>
          <span className="prompt">Why Georgia Tech?</span>
          <div className="content" contentEditable="true">{LOREM}</div>
        </div>
        <div className="head">
          <div className="applicant">
            <div className="profile">
              <img className="picture" src={profile_picture_0} alt="profile"/>
              <span className="name">Daniel</span>
            </div>
            <span className="deadline">Feb. 1</span>
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

export default Essay;
