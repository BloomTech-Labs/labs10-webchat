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
	url:props.url,     //url is passed a prop from Admin Panel
	image_id:"",
        selectedFile:null,
        error:null,
        logged:false,
    };

  }

componentDidMount() {

                /*const id = this.state.image_id;
                console.log(id);
                const request = axios.get(`/api/images/${id}`);


                request.then(image => {
                        console.log(image);
                        console.log(image.data.url);
                        console.log('image url on client:', image.data.url);
                        this.setState({url: image.data.url});

                })
                .catch(error => {
                        console.log(error.message);
                        this.setState({error:error});
                })*/

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
            </div>
          </div>
        </form> 	    
       </div>	
    )}
}

export default UserImage;
