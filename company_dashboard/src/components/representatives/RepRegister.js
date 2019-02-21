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
        console.log(authUser.user.uid);
        const data = { email: email };
        
        
        const verifyRequest = axios.post('/api/reps/verifyemail', data);  //check if the email is in approved emails table
        verifyRequest
          .then(company_id => {    // if the email was approved, get the company_id back from server
            this.props.history.push({   // send the user to a form to sign up and directly join their company
              pathname: '/reptocompanyform',
              state: { 
                company_id: company_id.data,
                uid: authUser.user.uid
              }  //company_id.data gives the company_id int value
            });
          })
          .catch(error => {
            this.setState({ error:error });
            this.props.history.push({           // send the user to the form to register a new company
              pathname: ROUTES.COMPANY_REGISTER,
              state: {
                uid: authUser.user.uid
              }
            });       
          })
      })
      .catch(error => {   // if the user was not created in Firebase
        this.setState({ error:error });
      });

    event.preventDefault();
  };


  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
   
  	const {email, password, password1, error} = this.state;

	//checking if all the required fields are non-empty  
        const condition = password !== password1 || password1 === '' || email === '';	    
	
	return (  
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

//wrapping the react component with firebase higher order component withFirebase to access all firebase functions
const RepSignUpForm = withRouter(withFirebase(RepSignUpFormBase));

export default RepSignUpPage;

export { RepSignUpForm};
