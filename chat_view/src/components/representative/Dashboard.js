import React, { Component } from 'react';
import LiveFeed from './LiveFeed';
import './Dashboard.css';

class Dashboard extends Component {



  render() {
    return (
      <div className="Dashboard">
        
        {/* Lists queries */}
        <LiveFeed />
        {/* Shows query information */}
        {/* <QueryPanel /> */}
        {/* STRETCH- Basic representative statistics */}
        {/* <Stats /> */}
      </div>
    )
  }
}

export default Dashboard;