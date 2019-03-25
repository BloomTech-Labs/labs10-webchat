import React, { Component } from 'react';
import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import "./RepRegister.css";



const RepSignUpPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <RepSignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class RepSignUpFormBase extends Component {
  constructor(props) {
    super(props);

     this.state = {
        email: "",
        password: "",
        password1: "",
        error: null,
        authTokenReceived: false,
    };
  }
  

  onSubmit = event => {
    const {email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log('authUser: ', authUser);
        //localStorage.setItem('authUser', JSON.stringify(authUser));  // If set here, passing uid to next component state may not be neccesary

        this.props.firebase.auth.currentUser.getIdToken()
          .then(idToken => {
            // console.log("idToken after doCreate: ", idToken);
            // localStorage.setItem('idToken', idToken);
            const data = { email: email };
            axios.defaults.headers.common['Authorization'] = idToken;   // This should set the Authorization header to idToken for all axios calls (across all components)

            const verifyRequest = axios.post('/api/approvedemails/verifyemail', data);  //check if the email is in approved emails table

            verifyRequest
              .then(company_id => {               // if the email was approved, get the company_id back from server
	              //localStorage.setItem('idToken', JSON.stringify(idToken));

                this.props.history.push({         // send the user to a form to sign up and directly join their company
                  pathname: ROUTES.APPROVED_REP_REGISTER,
                  state: {
                    company_id: company_id.data,  //company_id.data gives the company_id int value
                    uid: authUser.user.uid,        // authUser returned from Firebase
                    email: email
                  }
                });
              })
              .catch(error => {                  // if email is not approved server throws 400 error
                this.setState({ error:error });
                this.props.history.push({             // send the user to register a new company
                  pathname: ROUTES.COMPANY_REGISTER,
                  state: {
                    uid: authUser.user.uid,
                    email: email
                  }
                });
              })
          })
          .catch(error => {                 // if Firebase getIdToken throws an error
            this.setState({ error:error });
          });
    })
    .catch(error => {                    // if Firebase doCreateUser throws an error
        this.setState({ error:error });
    });

    event.preventDefault();
  }

  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
  	const {email, password, password1, error} = this.state;

	  //checking if all the required fields are non-empty
    const condition = password !== password1 || password1 === '' || email === '';

	  return (
	    <div className="register">
        <MuiThemeProvider>
          {this.state.logged ? (<Typography variant='display1' align='center' gutterBottom>
            Successfully Logged In
            </Typography>):(
            <div>
              <div className="register-top-bar">
                <Link to={ROUTES.LANDING}>
                  <img src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" alt="logo" />
                </Link>
                <div className="top-bar-links">
                  <a href='/pricing'>
                    <p className="navigation-button">PRICING</p>
                  </a>
                  <a href='/repslogin'>
                    <p className="navigation-button">SIGN IN</p>
                  </a>
                  <a href='/repregister'>
                    <p className="navigation-button">SIGN UP</p>
                  </a>
                </div>
              </div>
                <p className="header">Sign Up</p>
            <form onSubmit={this.onSubmit}>
              <TextField
                style = {{width: '65%'}}
                hintText="Enter your Email"
                floatingLabelText="Email"
                name="email"
                type="text"
                required={true}
                value={this.state.email}
                onChange={this.onChange}
              />
              <br/>

              <TextField
                style = {{width: '65%'}}
                hintText="Enter your password"
                floatingLabelText="Password"
                required={true}
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.onChange}
              />
              <br/>

              <TextField
                style = {{width: '65%'}}
                hintText="Re-enter your password"
                floatingLabelText="Re-enter password"
                name="password1"
                type="password"
                required={true}
                value={this.state.password1}
                onChange={this.onChange}
              />
              <br/>

              <RaisedButton
                className="register-button"
                label="SignUp"
                primary={true}
                type="submit"
                disabled={condition}
              />
              <p>By signing up, you agree to the Terms and Conditions and Privacy Policy.</p>

              {error && <p>{error.message}</p>}
                  <p>Already have an account? <Link to={ROUTES.REPS_LOGIN}>Login Here</Link></p>
            </form>
          </div>)}
        </MuiThemeProvider>
      </div>
    );
  }
}

//wrapping the react component with firebase higher order component withFirebase to access all firebase functions
const RepSignUpForm = withRouter(withFirebase(RepSignUpFormBase));

export default RepSignUpPage;

export { RepSignUpForm};
