import React from 'react';
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
          this.props.history.push(ROUTES.ADMIN_SETTINGS);
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
      <div>
        <MuiThemeProvider>
          {this.state.logged ? (<Typography variant='display1' align='center' gutterBottom>
            Successfully Logged In
          </Typography>):(
          <div>
            <AppBar
              title="Sign In"
            />
            <form onSubmit={this.onSubmit}>  
              <TextField
                hintText="Enter your Email"
                floatingLabelText="Email"
                required={true}
                name="email"			
                value={this.state.email}
                onChange={this.handleChange}
              />
              <br/>
              <TextField
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
                label="Login"
                primary={true}
                type="submit"
                disabled={condition}
              />

              {error && <p>{error.message}</p>}
            </form>
          </div>)}
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
 margin: 15,
};


//wrapping the react component with firebase higher order component withFirebase to access all firebase functions
const RepLoginForm = withRouter(withFirebase(RepLoginFormBase));

export default RepLoginPage;

export { RepLoginForm};

