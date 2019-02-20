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

  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>

      </form>
    );
  }
}	
