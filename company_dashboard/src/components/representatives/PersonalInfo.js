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

//const PersonalSignUpPage = () => (
  //<div>
    //<FirebaseContext.Consumer>
      //{firebase => <PersonalSignUpForm firebase={firebase} />}
    //</FirebaseContext.Consumer>
  //</div>
//);


class PersonalSignUpFormBase extends Component {
  constructor(props) {
    super(props);

     this.state = {
        email:"",
        name:"",
	motto:"",
	phonenumber:"",     
        error:null,
	uid:props.history.location.state.uid,     
        logged:true,  
    };

  }

  onSubmit = event => {
    const {email, name, motto, phonenumber} = this.state;
    event.preventDefault();
  };


  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email, name, motto, phonenumber, error} = this.state;
    const condition = name === '' || email === '';


    return (
      <div>
        <MuiThemeProvider>
        {this.state.logged ? (<div>Success, uid is: {this.props.history.location.state.uid}</div>):(
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
            hintText="Enter your name"
            floatingLabelText="Name"
            required={true}
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onChange}
           />
          <br/>

         <TextField
            hintText="Enter your motto"
            floatingLabelText="Motto"
            name="motto"
            type="text"
            required={true}
            value={this.state.motto}
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


//const PersonalSignUpForm = withRouter(withFirebase(PersonalSignUpFormBase));

export default PersonalSignUpFormBase;

//export { PersonalSignUpForm };	
