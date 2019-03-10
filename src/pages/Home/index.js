import React, { Component } from 'react';
import cover from 'statics/dummy/cover.jpg';
import './stylesheet.scss';
import { EssayThumbnail } from 'components';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="cover" style={{ backgroundImage: `url(${cover})` }}>
          <span className="quotes">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <section className="section">
          <h1 className="title">Most Viewed Essays</h1>
          <div className="essays">
            {
              new Array(8).fill(0).map((_, i) => (
                <EssayThumbnail className="essayThumbnail" key={i}/>
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
