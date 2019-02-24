import React, { Component } from 'react';
import { Link, withRouter, Route} from "react-router-dom"
import * as ROUTES from '../../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import axios from 'axios';
import "../settings/AccountSettings.css";

class UserImage extends Component {
  constructor(props) {
    super(props);

     this.state = {
	image_id:props.image_id,     
	url:"",
        selectedFile:null,
        error:null,
        logged:false,
    };

  }


  onSubmit = event => {

   
 };


fileChangeHandler = (event) => {
         this.setState({selectedFile: event.target.files[0]})
  };


render() {
    const {selectedFile} = this.state;
    const condition = selectedFile === '';


    return (
      <div>
      <form onSubmit={this.onSubmit}>
	   <div className="right-container">
            <div className="profile-picture">
              <img
                src={this.state.url}
                alt="profile picture"
              />
              <h2>Your Profile Photo</h2>
              <input
                type="file"
                onChange={this.fileChangedHandler}
              />
              <label>
                <Button
          	variant="outlined"
          	color="primary"
        	>  
	    	Update
                </Button>
              </label>
            </div>
          </div>
        </form> 	    
       </div>	
    )}
}

export default UserImage;
