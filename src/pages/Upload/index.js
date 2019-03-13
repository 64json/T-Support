import React from 'react';
import { Button, Field, Page, Row } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import './stylesheet.scss';
import { COLLEGES, MAJORS, PROMPTS } from '../../common/dummies';

class Upload extends Page {
  constructor(props) {
    super(props);

    this.state = {
      filename: '',
    };
  }

  handleChangeFile = e => {
    const { value } = e.target;
    const filename = value && value.split('\\').pop();
    this.setState({ filename });
  };

  renderPage() {
    const { filename } = this.state;

    return (
      <div className="Upload">
        <div className="top">
          <span className="title">Upload an Essay</span>
          <span className="description">Upload your college essay to be reviewed by college students.</span>
        </div>
        <form className="form">
          <Row>
            <Field label="College">
              <select>
                <option></option>
                {
                  COLLEGES.map(college => (
                    <option key={college} value={college}>{college}</option>
                  ))
                }
              </select>
            </Field>
            <Field label="Major" optional>
              <select>
                <option></option>
                {
                  MAJORS.map(major => (
                    <option key={major} value={major}>{major}</option>
                  ))
                }
              </select>
            </Field>
          </Row>
          <Row>
            <Field label="Prompt">
              <select>
                <option></option>
                {
                  PROMPTS.map(prompt => (
                    <option key={prompt} value={prompt}>{prompt}</option>
                  ))
                }
              </select>
            </Field>
            <Field label="Deadline" optional>
              <input type="date"/>
            </Field>
          </Row>
          <div className="essay">
            {
              filename ?
                <label className="drop">
                  <span className="placeholder">{filename}</span>
                  <input className="file" type="file" onChange={this.handleChangeFile}/>
                </label> :
                <label className="drop">
                  <FontAwesomeIcon className="icon" icon={faCloudUploadAlt}/>
                  <span className="placeholder">Drop a file to upload.</span>
                  <input className="file" type="file" onChange={this.handleChangeFile}/>
                </label>
            }
            <div className="divider"/>
            <Field className="paste">
              <textarea className="textarea" placeholder="Paste your essay here."/>
            </Field>
          </div>
          <Button className="upload" to="/essay/loremipsum">Upload</Button>
        </form>
      </div>
    );
  }
}

export default Upload;
