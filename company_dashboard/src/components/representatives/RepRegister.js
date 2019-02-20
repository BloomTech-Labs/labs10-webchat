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
        email:"",
        password:"",
        password1:"",
        error:null,
        logged:false,
    };

  }

   onSubmit = event => {
    const {email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
          console.log(authUser);

         this.setState({email:"", password:"", password1:"" });
         this.props.history.push(ROUTES.COMPANY_REGISTER);
      })
      .catch(error => {
        this.setState({ error:error });
      });

    event.preventDefault();
  };


  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
  	const {email, password, password1, error} = this.state;
        const condition = password !== password1 || password1 === '' || email === '';	    
	
	<div>
        <MuiThemeProvider>
        {this.state.logged ? (<Typography variant='display1' align='center' gutterBottom>
        Successfully Logged In
        </Typography>):(
       <div>
       <AppBar
            title="Sign Up"
       />
        <form onSubmit={this.onSubmit}>
        <TextField
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
              label="SignUp"
              primary={true}
              type="submit"
              disabled={condition}
        />

        {error && <p>{error.message}</p>}
      </form>
      </div>)}
   </MuiThemeProvider>
</div>);
  }
}

const RepSignUpForm = withRouter(withFirebase(RepSignUpFormBase));

export default RepSignUpPage;

export { RepSignUpForm};
