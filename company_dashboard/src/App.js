import React, { Component } from "react";
import "./App.css";
import { Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
//import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path='/' component={LandingPage} />
        <Route 
          path='/repslogin'
          component={RepsLogin}
        />
      </div>
    );
  }
}

export default App;
