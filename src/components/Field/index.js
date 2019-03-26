import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Field extends Component {
  render() {
    const { className, icon, label, children, optional } = this.props;

    return (
      <label className={classes('Field', className)}>
        {
          (icon || label || optional) &&
          <div className="header">
            {
              icon &&
              <FontAwesomeIcon className="icon" icon={icon} fixedWidth/>
            }
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
