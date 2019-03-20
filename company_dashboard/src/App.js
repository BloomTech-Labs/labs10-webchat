import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import LandingPage from "./components/LandingPage";
import CustomerSignUp from "./components/Customer/CustomerSignUp";
import RepsLogin from "./components/representatives/RepsLogin";
import AccountSettings from "./components/settings/AccountSettings";
import AdminPanel from "./components/Admin/AdminPanel";
import RepRegister from "./components/representatives/RepRegister";
import CompanyRegister from "./components/company/CompanyRegister";
import PersonalInfo from "./components/representatives/PersonalInfo";
import { withFirebase } from "./components/Firebase";
import Navigation from "./components/Navigation";
import SettingsNavigation from "./components/settings/SettingsNavigation";
import CustomerWaiting from './components/Customer/CustomerWaiting';
import ApprovedRepRegisterForm from './components/representatives/ApprovedRepRegister';
import CustomerChat from './components/chat/CustomerChat';
import ChatPage from './components/chat/ChatPage';
import DummyWebsite from './components/DummyWebsite/DummyWebsite';
import UpdatePassword from './components/settings/UpdatePassword';
import LiveFeed from './components/rep1/LiveFeed';
import ChatRepPage from './components/rep1/ChatRepPage';
import ChatDashboard from './components/ChatDashboard/ChatDashboard';
import Pricing from './components/settings/Pricing';
import Billing from './components/settings/Billing/V1Billing';
import Developers from './components/developers';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null
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
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.DEVELOPERS} component={Developers} />

          <Route path="/customersignup/:id" render ={(props) => < CustomerSignUp {...props} />} />

          <Route path={ROUTES.REP_REGISTER} component={RepRegister} />
          <Route path={ROUTES.APPROVED_REP_REGISTER} component={ApprovedRepRegisterForm} />
          <Route path={ROUTES.COMPANY_REGISTER} component={CompanyRegister} />
          <Route path={ROUTES.REPS_LOGIN} component={RepsLogin} />

          <Route path={ROUTES.ADMIN_SETTINGS} component={SettingsNavigation} />
          <Route path={ROUTES.UPDATE_PASSWORD} component={UpdatePassword} />

          <Route path={ROUTES.LIVE_FEED} component={LiveFeed} />
          <Route path={ROUTES.CHAT_DASHBOARD} component={ChatDashboard} />

          <Route path={ROUTES.PRICING} component={Pricing} />
          <Route path={ROUTES.BILLING} component={Billing} />

          <Route path={ROUTES.ADMIN_PANEL} component={AdminPanel} />
          <Route path={ROUTES.ACCOUNT_SETTINGS} component={AccountSettings} />
          <Route path={ROUTES.PERSONAL_INFO} component={PersonalInfo} />
          <Route path={ROUTES.CUSTOMER_WAITING} component={CustomerWaiting} />
          <Route path={ROUTES.CUSTOMER_CHAT} component={CustomerChat} />
	        <Route path={ROUTES.CHAT_PAGE} component={ChatPage} />  
          <Route path={ROUTES.DUMMY_PAGE} component={DummyWebsite} />
	        <Route path="/chatreppage/:id" render ={(props) => < ChatRepPage {...props} />} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
