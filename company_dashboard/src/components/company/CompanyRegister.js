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

const CompanyRegisterPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <CompanyRegisterForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class CompanyRegisterFormBase extends Component {
  constructor(props) {
    super(props);

     this.state = {
   	name:"", 
        error:null,
        logged:false,
    };

  }

  onSubmit = event => {
    event.preventDefault();
    const {name} = this.state;
    	  
  };


  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {name, error} = this.state;
    const condition = name === '';


    return (
      <div>
        <MuiThemeProvider>
        {this.state.logged ? 
	(<Typography variant='display1' align='center' gutterBottom>
        Successfully Registered your Company With WebChat
        </Typography>):(
       
	<div>
	<AppBar
            title="Register Company Name"
       />
        
	<form onSubmit={this.onSubmit}>
        <TextField
            hintText="Enter company name"
            floatingLabelText="Company Name"
            name="name"
            type="text"
            required={true}
            value={this.state.name}
            onChange={this.onChange}
           />
          <br/>

        <RaisedButton
              label="Register"
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


const CompanyRegisterForm = withRouter(withFirebase(CompanyRegisterFormBase));

export default CompanyRegisterPage;

export { CompanyRegisterForm};


