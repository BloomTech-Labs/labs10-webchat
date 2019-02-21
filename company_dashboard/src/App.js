import React, { Component } from "react";
import "./App.css";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as ROUTES from './constants/routes';
import LandingPage from './components/LandingPage';
import CustomerSignUp from './components/Customer/CustomerSignUp';
import RepsLogin from "./components/representatives/RepsLogin";
import RepRegister from "./components/representatives/RepRegister"
import CompanyRegister from "./components/company/CompanyRegister";
import PersonalInfo from "./components/representatives/PersonalInfo";
import { withFirebase } from './components/Firebase';
import Navigation from './components/Navigation';

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
       <Route path={ROUTES.REP_REGISTER} component={RepRegister} />	    
       <Route path={ROUTES.COMPANY_REGISTER} component={CompanyRegister} />
       <Route path={ROUTES.PERSONAL_INFO} component={PersonalInfo} />	    
      </div>
      </Router>	    
    );
  }
}

export default withFirebase(App);
