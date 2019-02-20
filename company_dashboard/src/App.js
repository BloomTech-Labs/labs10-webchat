import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";
import RepRegister from "./components/representatives/RepRegister"
import CompanyRegister from "./components/company/CompanyRegister";

class App extends Component {
  render() {
    return (
       <Router>	    
       <div className="App">
	
       <Route exact path={ROUTES.LANDING} component={LandingPage}/>
       <Route path={ROUTES.REPS_LOGIN} component={RepsLogin} /> 	    
       <Route path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />	
       <Route path={ROUTES.REP_REGISTER} component={RepRegister} />	    
       <Route path={ROUTES.COMPANY_REGISTER} component={CompanyRegister} />
	    
      </div>
      </Router>	    
    );
  }
}

export default App;
