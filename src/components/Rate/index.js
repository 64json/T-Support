import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { classes } from 'common/utils';
import './stylesheet.scss';

class Rate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hoveredStar: 0,
      selectedStar: 0,
    };
  }

  handleMouseOut = () => {
    this.setState({ hoveredStar: 0 });
  };

  handleMouseOver = hoveredStar => {
    this.setState({ hoveredStar });
  };

  handleClickRate = () => {
    const { hoveredStar, selectedStar } = this.state;
    this.setState({ selectedStar: hoveredStar === selectedStar ? 0 : hoveredStar });
  };

  render() {
    const { className } = this.props;
    const { hoveredStar, selectedStar } = this.state;

    return (
      <div className={classes('Rate', className)} onMouseOut={this.handleMouseOut}>
        {
          new Array(5).fill(0).map((_, i) => (
            <FontAwesomeIcon icon={faStar} className={classes('star', i < (hoveredStar || selectedStar) && 'selected')}
                             onMouseOver={() => this.handleMouseOver(i + 1)} key={i} onClick={this.handleClickRate}/>
          ))
        }
      </div>
    );
  }
}

export default Rate;
