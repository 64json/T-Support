import React, { Component } from 'react';
import { classes } from '../../common/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './stylesheet.scss';

class Button extends Component {
  render() {
    const { className, icon, children } = this.props;

    return (
      <button className={classes('Button', className)}>
        {
          icon &&
          <FontAwesomeIcon className="icon" icon={icon}/>
        }
        <span className="text">{children}</span>
      </button>
    );
  }
}

export default Button;
