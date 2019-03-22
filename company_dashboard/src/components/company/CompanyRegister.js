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
import "./CompanyRegister.css";

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
   	  name: "",
	  email: "",
      	  motto: "",
          phone: "",
  	  companyname: "",
      	  error:null,
          uid:props.history.location.state.uid,
          logged:false,
    };

  }


  onSubmit = event => {

    let data = new FormData();
      data.append('name', this.state.name);
      data.append('email', this.props.history.location.state.email);
      data.append('companyname', this.state.companyname);
      data.append('motto', this.state.motto);
      data.append('phone_number', this.state.phone);
      data.append('is_admin', true);
      data.append('uid', this.state.uid);


const request = axios.post('/api/reps/admin', data);

    request
      .then(response => {
		    // console.log(response.data);

		    //this.setState({logged:true});

        this.props.history.push({
          pathname: '/accountsettings',
          state: { rep_id: response.data, uid:this.state.uid }
        });

	    })
      .catch(err => {
        	console.log(err.message);
        	this.setState({error:err});
      })

	  event.preventDefault();
  };

  fileChangeHandler = (event) => {
 	  this.setState({selectedFile: event.target.files[0]})
  };


  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {name, companyname, email, error} = this.state;
    const condition = name === '' || companyname === '';


    return (
      <div className="company-detail">
        <MuiThemeProvider>
          {this.state.logged ?
          (<Typography variant='display1' align='center' gutterBottom>
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
            <p className="header">Enter your Company Details</p>
            <form onSubmit={this.onSubmit}>
              <TextField
                style = {{width: '65%'}}
                hintText="Enter your company name"
                floatingLabelText="Company Name"
                name="companyname"
                type="text"
                required={true}
                value={this.state.companyname}
                onChange={this.onChange}
              />
              <br/>

              <TextField
                  style = {{width: '65%'}}
                  hintText="Enter Your name"
                  floatingLabelText="Name"
                  name="name"
                  type="text"
                  required={true}
                  value={this.state.name}
                  onChange={this.onChange}
                />
                <br/>

              {/* <TextField
                  style = {{width: '65%'}}
                  hintText="Enter your email"
                  floatingLabelText="Email"
                  name="email"
                  type="text"
                  required={true}
                  value={this.state.email}
                  onChange={this.onChange}
                /> */}
                <br/>

                <TextField
                  style = {{width: '65%'}}
                  hintText="Enter your phone number"
                  floatingLabelText="Phone Number"
                  name="phone"
                  type="text"
                  value={this.state.phone}
                  onChange={this.onChange}
                />
                <br/>

                <TextField
                  style = {{width: '65%'}}
                  hintText="Enter your motto"
                  floatingLabelText="Motto"
                  name="motto"
                  type="text"
                  value={this.state.motto}
                  onChange={this.onChange}
                />
                <br/><br/>

                <RaisedButton
                  className="company-register-button"
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
