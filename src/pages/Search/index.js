import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { EssayThumbnail, Field, Page, Row } from 'components';
import { COLLEGES, MAJORS, PROMPTS } from 'common/dummies';
import { Review, Sample } from 'pages';
import './stylesheet.scss';

class Search extends Page {
  renderPage() {
    const isSample = this instanceof Sample;

    return (
      <div className="Search">
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
              {
                COLLEGES.map(college => (
                  <option key={college} value={college}>{college}</option>
                ))
              }
            </select>
          </Field>
          <Field className="field">
            <select className="filter">
              <option>Select major.</option>
              {
                MAJORS.map(major => (
                  <option key={major} value={major}>{major}</option>
                ))
              }
            </select>
          </Field>
          <Field className="field">
            <select className="filter">
              <option>Select prompt.</option>
              {
                PROMPTS.map(prompt => (
                  <option key={prompt} value={prompt}>{prompt}</option>
                ))
              }
            </select>
          </Field>
        </Row>
        <div className="essays">
          {
            new Array(16).fill(0).map((_, i) => (
              <EssayThumbnail className="essayThumbnail" key={i}
                              decision={isSample && ['accepted', 'rejected', 'waitlisted'][(5 + i) % 6 / 2 | 0]}/>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Search;
