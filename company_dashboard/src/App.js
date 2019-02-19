import React, { Component } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
//import { Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";

class App extends Component {
  render() {
    return (
       <Router>	    
      <div className="App">

       <Route exact path={ROUTES.LANDING} component={LandingPage} />
       <Route exact path={ROUTES.REPS_LOGIN} component={RepsLogin} /> 	    
       <Route exact path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />	
	    
      </div>
      </Router>	    
    );
  }
}

export default App;
