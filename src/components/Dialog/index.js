import React, { Component } from 'react';
import './stylesheet.scss';
import { classes } from 'common/utils';

class Dialog extends Component {
  render() {
    const { className, children, onSubmit } = this.props;

    return (
      <form className={classes('Dialog', className)} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
}

export default Dialog;
