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

  onSubmit = event => {
    const { email, password } = this.state;
	  
    this.props.firebase
      .doSignInWithEmailAndPassword (email, password)
      .then(authUser => {
        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {
          axios.defaults.headers.common['Authorization'] = idToken;   // This should set the Authorization header to idToken for all axios calls (across all components)
          this.setState({email: "", password: ""});


		      //const uid = authUser.user.uid;
          // const data ={uid: authUser.user.uid};
          const request = axios.get('/api/reps/getbyUID');
  
          request.then(response => {
          // console.log('rep_id is :', response.data.id);
 				
			      this.props.history.push({
              pathname: '/adminsettings',
              state: {
                rep_id: response.data.id       // authUser returned from Firebase
              }
            });
          })
          .catch(err => {
            console.log(err.message);
          })
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
                <img src="https://i.ibb.co/Mpy1WhB/3029ba78-770c-49a3-aaa6-6a6cfc58b56c.png" alt="logo" />
                    <p>Send me back to the <Link to={ROUTES.REP_REGISTER}>home page</Link></p>
            </div>
            <p className="header">Member Login</p> 
            <form onSubmit={this.onSubmit}> 
              <TextField
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

