import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EssayThumbnail, Field, Page, Row } from 'components';
import './stylesheet.scss';

class Review extends Page {
  renderPage() {
    return (
      <div className="Review">
        <div className="searchBar">
          <FontAwesomeIcon className="icon" icon={faSearch}/>
          <Field className="field">
            <input type="text" className="search"/>
          </Field>
        </div>
        <Row className="filterBar">
          <Field className="field">
            <select className="filter">
              <option>Select college.</option>
              <option>Georgia Institute of Techonology</option>
              <option>Emory University</option>
              <option>University of Georgia</option>
              <option>Georgia State University</option>
              <option>Spelman College</option>
              <option>Mercer University</option>
            </select>
          </Field>
          <Field className="field">
            <select className="filter">
              <option>Select major.</option>
              <option>Computer Science</option>
              <option>Mechanical Engineering</option>
              <option>Electrical and Computer Engineering</option>
            </select>
          </Field>
          <Field className="field">
            <select className="filter">
              <option>Select prompt.</option>
              <option>Why Georgia Tech?</option>
            </select>
          </Field>
        </Row>
        <div className="essays">
          {
            new Array(16).fill(0).map((_, i) => (
              <EssayThumbnail className="essayThumbnail" key={i}/>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Review;
