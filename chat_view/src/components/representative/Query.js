import React, { Component } from 'react';

class Query extends Component {

  render() {
    return(
      <div onClick={this.props.clickQuery}>
        name: {this.props.query}
      </div>
    );
  }
}

export default Query;