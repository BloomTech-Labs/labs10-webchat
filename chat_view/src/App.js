import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import Chat from './components/Chat';
import './App.css';
import Dashboard from './components/representative/Dashboard';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Chat /> */}
        <Dashboard />
      </div>
    );
  }
}

export default App;
