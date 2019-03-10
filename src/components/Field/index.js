import React, { Component } from 'react';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Field extends Component {
  render() {
    const { className, label, children, optional } = this.props;

    return (
      <label className={classes('Field', className)}>
        {
          (label || optional) &&
          <div className="header">
            {
              label &&
              <span className="label">{label}</span>
            }
            {
              optional &&
              <span className="optional"/>
            }
          </div>
        }
        {children}
      </label>
    );
  }
}

export default Field;
