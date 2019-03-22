import React from 'react';
import { BrowserRouter as Router, Link, withRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { withFirebase } from "./Firebase";
import { FirebaseContext } from './Firebase';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import * as ROUTES from '../constants/routes';
import SignOut from './SignOut';
import './Navigation.css'

const Navigation = () => (
   <div>
     <FirebaseContext.Consumer>
       {firebase => <NavigationComponent firebase={firebase} />}
     </FirebaseContext.Consumer>
   </div>
 );

class NavigationBaseForm extends React.Component {
constructor(props) {
super(props);
this.state = {
    name: "",
    uid:"",
    email: "",
    is_admin: "",
    is_paid: "",
    selectedFile: null,
    id: "",
    error:null,
    activePage: ""
  }
};

componentDidMount() {
	this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {
	console.log('user after onAUthState', user);

        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

    	axios.defaults.headers.common['Authorization'] = idToken;

     const request = axios.get('/api/reps/getbyUID');

    request.then(response => {
      console.log("inside Navigation getByUID response: ", response);
      // console.log(response.data);

       console.log('is admin', response.data.is_admin);
      this.setState({
        is_admin: response.data.is_admin
      });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ error: err });
      })
  })
  .catch(error => {            // if Firebase getIdToken throws an error
        console.log(error.message);
       this.setState({ error:error });
	//this.props.history.push('/repslogin');
   })
  }

else {
                 this.props.history.push('/repslogin'); //if user is signed out redirect to login page
     }
})
    let current_page = window.location.href;
    if(process.env.NODE_ENV == 'development') {
      this.setState({
        activePage: current_page.slice(22)
      })
    } else {
      this.setState({
        activePage: current_page.slice(35)
      })
    }
};


render() {
    if(this.state.is_admin) {
      return (
        <div className="navigation">
        <img src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" alt="logo" />
        <div className="navigation-links">
          <Link to={ROUTES.CHAT_DASHBOARD} style={{ color: this.state.activePage == "chatdashboard" ? '#63DD15' : ''}}>Chat Dashboard</Link>
          <Link to={ROUTES.ACCOUNT_SETTINGS} style={{ color: this.state.activePage == "accountsettings" ? '#63DD15': ''}}>Account Settings</Link>
          <Link to={ROUTES.ADMIN_PANEL} style={{ color: this.state.activePage == "adminpanel" ? '#63DD15': ''}}>Admin Panel</Link>
          <Link to={ROUTES.BILLING} style={{ color: this.state.activePage == "billing" ? '#63DD15': ''}}>Billing</Link>
          <SignOut />
        </div>
      </div>
      )
    } else return (
        <div className="navigation">
        <img src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" alt="logo" />
        <div className="navigation-links">
          <Link to={ROUTES.CHAT_DASHBOARD}>Chat Dashboard</Link>
          <Link to={ROUTES.ACCOUNT_SETTINGS}>Account Settings</Link>
          <SignOut />
        </div>
      </div>
    )
  }
}

NavigationBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const NavigationComponent =  (withRouter(withFirebase(NavigationBaseForm)));

export default Navigation;

export { NavigationComponent};
