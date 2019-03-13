import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Profile extends Component {
  render() {
    const { className, user, title, onClick } = this.props;

    const Component = onClick === undefined ?
      props => <Link {...props} to={`/user/${user.id}`}/> :
      props => <div {...props} onClick={onClick}/>;

    return (
      <Component className={classes('Profile', className)}>
        <img className="picture" src={user.picture} alt="profile"/>
        <div className="info">
          <span className="name">{user.firstName}</span>
          {
            title &&
            <span className="title">{title}</span>
          }
        </div>
      </Component>
    );
  }
}

export default Profile;
