import React, { Component } from 'react';
import './Query.css';

class Query extends Component {

  render() {
    return(
      <tag>
        Customer Name: {this.props.query.customerName} | Customer Email: {this.props.query.customerEmail} | Customer Question: {this.props.query.question}
      </tag>
    );
  }
}

export default Query;