import React, { Component } from 'react';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Row extends Component {
  render() {
    const { className, children } = this.props;

    return (
      <label className={classes('Row', className)}>
        {children}
      </label>
    );
  }
}

export default Row;
