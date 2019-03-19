import React from 'react';
import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from "@material-ui/core/Button";
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import "./RepsLogin.css";

const RepLoginPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <RepLoginForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class RepLoginFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      logged: false,
    }
  }


 componentDidMount() {
 //onAuthStateChanged firebase method checks if a is signed in or signed out
  this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {
		this.props.firebase.auth.currentUser.getIdToken()
        	.then(idToken => {
        		console.log("idToken in Rep Login: ", idToken);
        		axios.defaults.headers.common['Authorization'] = idToken;
			this.props.history.push('/accountsettings');  //if signed in displays account settings page
		})
		.catch(error => {            // if Firebase getIdToken throws an error
        		console.log(error.message);
              		this.setState({ error:error });
      		})
	}
	else{
		this.props.history.push('/repslogin');   //if signed out tehn displays login page
	}

 })
}


  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword (email, password)
      .then(authUser => {
        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

        axios.defaults.headers.common['Authorization'] = idToken;

	this.setState({email: "", password: ""});

          //const uid = authUser.user.uid;
          // const data ={uid: authUser.user.uid};
          //const request = axios.get('/api/reps/getbyUID');

          //request.then(response => {
          // console.log('rep_id is :', response.data.id);

	   //localStorage.setItem('rep_id', response.data.id);

	     this.props.history.push('/accountsettings');
          //.catch(err => {
           // console.log(err.message);
          })
        .catch(error => {                 // if Firebase getIdToken throws an error
          console.log(error.message);
          this.setState({ error:error });
        });
      })
      .catch(error => {
        this.setState({ error:error });
      });
      event.preventDefault();
  };



  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // Media queries

  render() {
    const {email, password, error} = this.state;

    //checking if all the required fields are non-empty
    const condition = password === '' || email === '';


    return (
      <div className="login">
        <MuiThemeProvider>
          {this.state.logged ? (<Typography variant='display1' align='center' gutterBottom>
            Successfully Logged In
          </Typography>):(
          <div>
            <div className="login-top-bar">
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
            <p className="header">Member Login</p>
            <form onSubmit={this.onSubmit}>
              <TextField
                style = {{width: '65%'}}
                autoComplete='off'
                hintText="Enter your Email"
                floatingLabelText="Email"
                required={true}
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br/>
              <TextField
                style = {{width: '65%'}}
                autoComplete='off'
                type="password"
                hintText="Enter your Password"
                floatingLabelText="Password"
                required={true}
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <br/>

              <RaisedButton
                className="login-button"
                label="Login"
                primary={true}
                type="submit"
                disabled={condition}
              />
              <p>By logging in, you agree to the Terms and Conditions and Privacy Policy.</p>

              {error && <p>{error.message}</p>}
              <Link to={ROUTES.REP_REGISTER}>Create an Account</Link>
            </form>
          </div>)}
        </MuiThemeProvider>
      </div>
    );
  }
}


//wrapping the react component with firebase higher order component withFirebase to access all firebase functions
const RepLoginForm = withRouter(withFirebase(RepLoginFormBase));

export default RepLoginPage;

export { RepLoginForm};
