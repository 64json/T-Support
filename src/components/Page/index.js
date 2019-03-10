import React, { Component } from 'react';
import './stylesheet.scss';

class Page extends Component {
  renderPage() {
    return null;
  }

  render() {
    return (
      <div className="Page">
        {this.renderPage()}
      </div>
    );
  }
}

export default Page;
