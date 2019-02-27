import React, { Component } from 'react';
import './Query.css';

class Query extends Component {

  render() {
    return(
      <div className="Query" onClick={() => this.props.openQuery(this.props.uuid)}>
        Room ID: {this.props.uuid}
      </div>
    );
  }
}

export default Query;