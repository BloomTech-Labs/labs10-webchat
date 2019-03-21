  import React, { Component } from 'react';
// import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
// import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

class ApprovedRepRegisterForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        email: props.history.location.state.email,
        motto: "",
        phone: "",
        company_id: props.history.location.state.company_id,
        uid: null,
        company_name: "",
	      selectedFile:null,
        error:null,
        logged:false,
      };
    }

    componentDidMount() {
      const uid = JSON.parse(localStorage.getItem('uid'));
      // ** NOTE: if we use authUser, either through localStorage or currentUser, we can set email
      // that way the user doesn't have to write it again, and we make sure it matches the registration email
      const company_id = this.state.company_id;
      const companyInfoRequest = axios.get(`/api/companies/${company_id}`);
      companyInfoRequest
        .then(company => {
          this.setState({
            company_name: company.name,
            uid: uid
          });
        })
        .catch(err => {
          console.log("Error finding company name from company. How did you get to this page?")
        })
    }

    onSubmit = event => {
        const data = {
          name: this.state.name,
          email: this.state.email,
          company_id: this.state.company_id,
          company_name: this.state.company_name,
          motto: this.state.motto,
          phone_number: this.state.phone,
          uid: this.state.uid,
          file: this.state.selectedFile
        };

        const addRepRequest = axios.post("/api/reps/nonadmin", data);  // Add user's info to the reps table

        addRepRequest.then(response => {
            console.log(response.data);
            //this.setState({logged:true});

            this.props.history.push({              // send the user to account settings page
                  pathname: '/accountsettings',
                  state: { rep_id: response.data }  // response.data should be the id returned by addRepRequest
            });

        })
        .catch(err => {
            console.log(err.message);
            this.setState({ error:err });
        })
        event.preventDefault();
    };


    onChange = event => {
          this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const {name, email, error} = this.state;
      const condition = name === ''; //|| email === '';


        return (
        <div>
            <MuiThemeProvider>
            {this.state.logged ?
                (<Typography variant='display1' align='center' gutterBottom>
                Successfully Logged In
                </Typography>):(

        <div>
        <AppBar
              title="Register with your company"
         />

      <form onSubmit={this.onSubmit}>

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

           {/* <TextField
              hintText="Enter your email"
              floatingLabelText="Email"
              name="email"
              type="text"
              required={true}
              value={this.state.email}
              onChange={this.onChange}
             />
            <br/> */}

       <TextField
              hintText="Enter phone number"
              floatingLabelText="Phone Number"
              name="phone"
              type="number"
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

export default ApprovedRepRegisterForm;
