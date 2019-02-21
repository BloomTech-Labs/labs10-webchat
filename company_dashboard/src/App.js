import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";
import AccountSettings from "./components/settings/AccountSettings";
import AdminPanel from "./components/Admin/AdminPanel";
import RepRegister from "./components/representatives/RepRegister"
import CompanyRegister from "./components/company/CompanyRegister";
import PersonalInfo from "./components/representatives/PersonalInfo";
import { withFirebase } from './components/Firebase';
import Navigation from './components/Navigation';
import SettingsNavigation from "./components/settings/SettingsNavigation";


class App extends Component {
constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }
	
		
render() {
    return (
       <Router>	
       <div className="App">


       <Route exact path={ROUTES.LANDING} component={LandingPage}/>
       <Route path={ROUTES.REPS_LOGIN} component={RepsLogin} /> 	    
       <Route path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />
       <Route path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
       <Route path={ROUTES.ADMIN_PANEL} component={AdminPanel} />
       <Route path={ROUTES.CUSTOMER_SIGN_UP} component={CustomerSignUp} />	
       <Route path={ROUTES.REP_REGISTER} component={RepRegister} />	    
       <Route path={ROUTES.COMPANY_REGISTER} component={CompanyRegister} />
<<<<<<< HEAD
       <Route path={ROUTES.ADMIN_SETTINGS} component={SettingsNavigation} />
	    
=======
       <Route path={ROUTES.PERSONAL_INFO} component={PersonalInfo} />	    
>>>>>>> 31555dac033ca623426892a1c6f57673d2a9adf6
      </div>
      </Router>	    
    );
  }
}

export default withFirebase(App);
