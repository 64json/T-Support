import React, { Component } from 'react';
import { classes } from '../../common/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './stylesheet.scss';
import { Link } from 'react-router-dom';

class Button extends Component {
  render() {
    const { className, primary, icon, children, to, onClick } = this.props;

    const Component = to ?
      props => <Link {...props} to={to}/> :
      props => <button {...props} onClick={onClick}/>;

    return (
      <Component className={classes('Button', primary && 'primary', className)}>
        {
          icon &&
          <FontAwesomeIcon className="icon" icon={icon}/>
        }
        <span className="text">{children}</span>
      </Component>
    );
  }
}

export default Button;
