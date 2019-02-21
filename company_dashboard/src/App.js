import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";
<<<<<<< HEAD
import AccountSettings from "./components/settings/AccountSettings";
import AdminPanel from "./components/Admin/AdminPanel";
=======
import RepRegister from "./components/representatives/RepRegister"
import CompanyRegister from "./components/company/CompanyRegister";
>>>>>>> 9d34efec351cb815ff118cac129a2acca9f559a3

class App extends Component {
  render() {
    return (
       <Router>	
       <div className="App">
	
       <Route exact path={ROUTES.LANDING} component={LandingPage}/>
       <Route path={ROUTES.REPS_LOGIN} component={RepsLogin} /> 	    
<<<<<<< HEAD
       <Route path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />
       <Route path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
       <Route path={ROUTES.ADMIN_PANEL} component={AdminPanel} />
=======
       <Route path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />	
       <Route path={ROUTES.REP_REGISTER} component={RepRegister} />	    
       <Route path={ROUTES.COMPANY_REGISTER} component={CompanyRegister} />
>>>>>>> 9d34efec351cb815ff118cac129a2acca9f559a3
	    
      </div>
      </Router>	    
    );
  }
}

export default App;
