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
  state = {
    name: "",
    uid:"",
    email: "",
    is_admin: "",
    is_paid: "",
    selectedFile: null,
    id: "",
    error:null,
  };
  componentDidMount() {
	this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {

        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

    	axios.defaults.headers.common['Authorization'] = idToken;

     const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
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
   })
  }
})
};
  render() {
    if(this.state.is_admin) {
      return (
        <div className="navigation">
        <img src="https://i.ibb.co/Mpy1WhB/3029ba78-770c-49a3-aaa6-6a6cfc58b56c.png" alt="logo" />
        <div className="navigation-links">
          <Link to={ROUTES.CHAT_DASHBOARD}>Chat Dashboard</Link>
          <Link to={ROUTES.ACCOUNT_SETTINGS}>Account Settings</Link>
          <Link to={ROUTES.ADMIN_PANEL}>Admin Panel</Link>
          <Link to={ROUTES.BILLING}>Billing</Link>
          <SignOut />
        </div>
      </div>
      )
    } else return (
        <div className="navigation">
        <img src="https://i.ibb.co/Mpy1WhB/3029ba78-770c-49a3-aaa6-6a6cfc58b56c.png" alt="logo" />
        <div className="navigation-links">
          <Link to={ROUTES.CHAT_DASHBOARD}>Chat Dashboard</Link>
          <Link to={ROUTES.ACCOUNT_SETTINGS}></Link>
          <SignOut />
        </div>
      </div>
    )
  }
}

NavigationBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const NavigationComponent =(withRouter(withFirebase(NavigationBaseForm)));

export default Navigation;

export { NavigationComponent};
