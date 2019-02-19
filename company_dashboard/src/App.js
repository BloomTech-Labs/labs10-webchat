import React, { Component } from "react";
import "./App.css";

import LandingPage from './components/LandingPage';
//import CustomerSignUp from './components/Customer/CustomerSignUp';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LandingPage />
      </div>
    );
  }
}

export default App;
