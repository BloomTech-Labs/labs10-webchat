import React, { Component } from 'react';

class QueryPanel extends Component {
  
  render() {
    return(
      <div>
        Customer Panel
        Customer Name: Name
        Customer Question: {this.props.uuid}
      </div>
    )
  }
}

export default QueryPanel;