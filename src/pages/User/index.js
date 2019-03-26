import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMinusCircle, faPlusCircle, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Button, EssayThumbnail, Field, Page } from 'components';
import { NotFound } from 'pages';
import { USERS } from 'common/dummies';
import { classes } from 'common/utils';
import './stylesheet.scss';

const Item = ({ className, icon, text, href }) => {
  const Component = href ?
    props => <a {...props} href={href} rel="noopener" target="_blank"/> :
    props => <div {...props}/>;
  return (
    <Component className={classes('item', className)}>
      <FontAwesomeIcon className="icon" icon={icon} fixedWidth/>
      <span className="text">{text}</span>
    </Component>
  );
};

class User extends Page {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
    };
  }

  handleClickEdit = () => {
    this.setState({ edit: true });
  };

  handleClickSave = () => {
    this.setState({ edit: false });
  };

  handleClickCancel = () => {
    this.setState({ edit: false });
  };

  renderPage() {
    const { userId } = this.props.match.params;
    const { edit } = this.state;
    const user = USERS.find(user => user.id === userId);

    return !user ? <NotFound/> : (
      <div className="User">
        <div className="sectionProfile">
          <div className="card">
            <img className="picture" src={user.picture} alt="profile"/>
            <div className="info">
              <div className="name">
                <span className="firstName">{user.firstName}</span>
              </div>
              <span className="title">Reviewer</span>
            </div>
          </div>
          <div className="divider"/>
          <div className="itemContainer">
            {
              edit ?
                <Field className="field" icon={faUniversity} label="School" optional>
                  <div className="schools">
                    <div className="school-remove">
                      <FontAwesomeIcon className="icon" icon={faMinusCircle} fixedWidth/>
                      <span className="text">Georgia Institute of Technology</span>
                    </div>
                    <div className="school-add">
                      <FontAwesomeIcon className="icon" icon={faPlusCircle} fixedWidth/>
                      <span className="text">Add a college</span>
                    </div>
                  </div>
                </Field> :
                <Item icon={faUniversity}
                      text="Georgia Institute of Technology"/>
            }
            {
              edit ?
                <Field className="field" icon={faMapMarkerAlt} label="Region" optional>
                  <select defaultValue="northeast">
                    <option></option>
                    <option value="northeast">Northeast</option>
                    <option>Midwest</option>
                    <option>South</option>
                    <option>West</option>
                    <option>Puerto Rico and other US territories</option>
                    <option>International</option>
                  </select>
                </Field> :
                <Item icon={faMapMarkerAlt} text="Northeast"/>
            }
            {
              edit ?
                <Field className="field" icon={faLinkedin} label="LinkedIn" optional>
                  <Button className="linkedIn" icon={faLinkedin}>Connect a LinkedIn Account</Button>
                </Field> :
                <Item icon={faLinkedin} text={`linkedin.com/in/${user.id}`}
                      href={`https://www.linkedin.com/in/${user.id}/`}/>
            }
          </div>
          {
            edit ?
              <div className="buttons">
                <Button className="save" onClick={this.handleClickSave}>Save</Button>
                <Button className="cancel" onClick={this.handleClickCancel}>Cancel</Button>
              </div> :
              <Button className="edit" onClick={this.handleClickEdit}>Edit</Button>
          }
        </div>
        <div className="sectionActivity">
          <span className="title">Recently Reviewed</span>
          <div className="essays">
            {
              new Array(4).fill(0).map((_, i) => (
                <EssayThumbnail className="essayThumbnail" key={i} decision="accepted"/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default User;
