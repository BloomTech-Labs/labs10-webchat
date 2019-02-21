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
//import PersonalInfo from '../representatives/PersonalInfo';


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
	email:"",
	motto:"",
	phone:"",
  companyname:"",  
  uid: props.history.location.state.uid,   
        error:null,
        logged:false,
    };

  }

  onSubmit = event => {

	const data = {
    name: this.state.name, 
    email: this.state.email, 
    companyname: this.state.companyname, 
    motto: this.state.motto, 
    phone_number: this.state.phone, 
    is_admin: true,
    uid: this.state.uid
  };
	  
	const request = axios.post("http://localhost:5000/api/reps", data);
    
        request.then(response => {
		console.log(response.data);
		//this.setState({logged:true});
	
		this.props.history.push({
                pathname: '/personalinfo',
                state: { rep_id: response.data }
                });		
		
	})
        .catch(err => {
        	console.log(err.message);
        	this.setState({error:err});		
    	})
	event.preventDefault();  
  };	  
   	  

  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {name, companyname, email, error} = this.state;
    const condition = name === '' || email === '' || companyname === '';


    return (
      <div>
        <MuiThemeProvider>
        {this.state.logged ? 
	(<Typography variant='display1' align='center' gutterBottom>
        Successfully Logged In
        </Typography>):(
       
	<div>
	<AppBar
            title="Register Details"
       />
        
	<form onSubmit={this.onSubmit}>
        <TextField
            hintText="Enter company name"
            floatingLabelText="Company Name"
            name="companyname"
            type="text"
            required={true}
            value={this.state.companyname}
            onChange={this.onChange}
           />
          <br/>

         <TextField
            hintText="Enter Your name"
            floatingLabelText="Name"
            name="name"
            type="text"
            required={true}
            value={this.state.name}
            onChange={this.onChange}
           />
          <br/>
	
         <TextField
            hintText="Enter your email"
            floatingLabelText="Email"
            name="email"
            type="text"
            required={true}
            value={this.state.email}
            onChange={this.onChange}
           />
          <br/>
	
	 <TextField
            hintText="Enter phone number"
            floatingLabelText="Phone Number"
            name="phone"
            type="text"
            value={this.state.phone}
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


