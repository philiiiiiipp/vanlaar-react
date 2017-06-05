import React, { Component } from 'react';


export default class PageWrapper extends Component {

  render() {
    const { children } = this.props;

    return (
      <div>
        <h1>Jajaja</h1>
        {children}
      </div>
    );
  }
}
