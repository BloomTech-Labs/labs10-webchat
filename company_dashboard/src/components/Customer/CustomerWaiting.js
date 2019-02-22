import React from 'react';

class CustomerWaiting extends React.Component {
  state = { 
    companyName: 'Water Bottle',
    motto: 'Stay Hydrated',
    customerName: 'John',
    number: '2',
    summary: 'Is this water bottle BPA free?'
  };

  render() {
    return (
      <div>
        {this.state.companyName}
        <br/>
        {this.state.motto}
        <div className='greeting'>
          <p>Thanks for reaching out to us, {this.state.customerName}. Your business is valuable to us.
          An agent will speak with you as soon as possible.</p>
        </div>
        <div className='waiting-line'>
          <h2>You are number {this.state.number} in line.</h2>
        </div>
        <div className='questions'>
          <h4>What can we help with today?</h4>
          <p>{this.state.summary}</p>
        </div>
        <button>Cancel</button>
      </div>
    );
  }
}

export default CustomerWaiting;