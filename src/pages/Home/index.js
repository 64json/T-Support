import React from 'react';
import { connect } from 'react-redux';
import { EssayThumbnail, Page } from 'components';
import { actions } from 'reducers';
import cover from 'statics/dummy/cover.jpg';
import './stylesheet.scss';

class Home extends Page {
  renderPage() {
    const { user } = this.props.env;

    return user ? (
      <div className="Home">
        <section className="section">
          <span className="title">Georgia Institute of Technology</span>
          <div className="essays">
            {
              new Array(4).fill(0).map((_, i) => (
                <EssayThumbnail className="essayThumbnail" key={i}/>
              ))
            }
          </div>
          <span className="title">U(sic)GA</span>
          <div className="essays">
            {
              new Array(4).fill(0).map((_, i) => (
                <EssayThumbnail className="essayThumbnail" key={i} decision="rejected"/>
              ))
            }
          </div>
        </section>
      </div>
    ) : (
      <div className="Home">
        <div className="cover" style={{ backgroundImage: `url(${cover})` }}>
          <span className="quotes">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <section className="section">
          <span className="title">Recently Accepted Essays</span>
          <div className="essays">
            {
              new Array(8).fill(0).map((_, i) => (
                <EssayThumbnail className="essayThumbnail" key={i} decision="accepted"/>
              ))
            }
          </div>
        </section>
      </div>
    );
  }
}

export default connect(({ env }) => ({ env }), actions)(Home);
