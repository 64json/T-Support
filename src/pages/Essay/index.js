import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Page, Profile } from 'components';
import { LOREM, USERS } from 'common/dummies';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Essay extends Page {
  renderPage() {
    const { essayId, editorId } = this.props.match.params;

    let __html = LOREM;
    if (editorId !== 'daniel') {
      __html = __html.replace('aenean euismod elementum', '<span class="delete">aenean euismod elementum</span><span class="add">hello world</span>');
      __html = __html.replace('nec dui nunc mattis', '<span class="delete">nec dui nunc mattis</span><span class="add">blah blah blah</span>');
      __html = __html.replace('Sed id semper risus in. Ut tortor pretium viverra suspendisse potenti nullam ac.', '<span class="delete">Sed id semper risus in. Ut tortor pretium viverra suspendisse potenti nullam ac.</span>');
      __html = '<span class="add">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </span>' + __html;
    }

    return !editorId ? <Redirect to={`/essay/${essayId}/${USERS[0].id}`}/> : (
      <div className="Essay">
        <div className="body">
          <div className="row">
            <span className="college">Georgia Institute of Technology</span>
            <span className="deadline">Feb. 1</span>
          </div>
          <span className="prompt">Why Georgia Tech?</span>
          <div className="paper">
            <div className="tabContainer">
              {
                USERS.map(user => (
                  <Link className={classes('tab', editorId === user.id && 'selected')} key={user.id}
                        to={`/essay/${essayId}/${user.id}`}>
                    <Profile className="profile" user={user} onClick={null}/>
                    {
                      user.id !== editorId &&
                      <span className="last">3 min</span>
                    }
                    {
                      user.id !== editorId &&
                      <span className="badge">2</span>
                    }
                  </Link>
                ))
              }
            </div>
            <div className="content" spellCheck="false" contentEditable="true" dangerouslySetInnerHTML={{ __html }}/>
          </div>
        </div>
        <div className="sidenote">
          {
            USERS[0].id !== editorId &&
            new Array(10).fill(0).map((_, i) => (
              <div className="note" key={i}>
                <div className="note-head">
                  <span className="time">10:23 AM</span>
                  <div className="actions">
                    <div className="action accept">
                      <FontAwesomeIcon icon={faCheck}/>
                    </div>
                    <div className="action reject">
                      <FontAwesomeIcon icon={faTimes}/>
                    </div>
                  </div>
                </div>
                <div className="note-body">
                  I don't think this sentence is necessary.
                </div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Essay;
