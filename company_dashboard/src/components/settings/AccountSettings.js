import React from "react";
import { withFirebase } from "../Firebase";
import { FirebaseContext } from '../Firebase';
import { Link, withRouter, Route} from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import Typography from "@material-ui/core/Typography";
import Navigation from "../Navigation";
import '../Navigation.css';
import "./AccountSettings.css";

const styles = theme => ({
  container: {
    display: "flex"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});


const AccountSettings = () => (
   <div>
     <FirebaseContext.Consumer>
       {firebase => <AccountSettingsComponent firebase={firebase} />}
     </FirebaseContext.Consumer>
   </div>
 );

class AccountSettingsBaseForm extends React.Component {
  state = {
    name: "",
    uid:"",	  
    email: "",
    phone_number: 0,
    motto: "",
    image_url:"",	  
    image_id:"",	  
    selectedFile: null,
    id: "",
    error:null,	  
  };

  componentDidMount() {
    //const request = axios.get(`/api/reps/getbyUID`);
	 
    //using allDetails endpoint instead of getbyUID since image_url wasn't present in getByUID endpoint, allDetails endpoints uses innerJoin to get all the rep details as well as image_url, instead of making 2 different axios calls, one for image and one for reps
	  
    this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {

        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

        console.log("idToken after in Admin panel: ", idToken);
        axios.defaults.headers.common['Authorization'] = idToken;
    	  
    const request = axios.get("/api/reps/alldetails");	  

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
      // console.log(response.data);

      this.setState({ 
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        motto: response.data.motto,
        id: response.data.id,
        image_id:response.data.image_id,
	      image_url: response.data.url,
	      uid: response.data.uid       
       });
    })
    .catch(err => {
      console.log(err.message);
      this.setState({ error: err });
    })
})		
   .catch(error => {            // if Firebase getIdToken throws an error
        console.log(error.message);
              this.setState({ error:error });
      })
} 
  else{
                 this.props.history.push('/repslogin');
      }
   })		
  };

  //Sets Input to state
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      phone_number: this.state.phone_number,
      motto: this.state.motto,
      email: this.state.email,
      id: this.state.id  
    };
    console.log(user);

    const request = axios.put('/api/reps/updaterepinfo', user);

    request
      .then(response => {
        console.log("User info updated");
        console.log(response);
      })
      .catch(err => {
        console.log(err.message);
      });
  }
  
  //Sets selectedFile in state after selecting an image
  
 fileChangedHandler = (event) => {
    this.setState({selectedFile: event.target.files[0]});
  };

  
  onSubmit = event => {

    console.log('inside onSubmit');	  
    console.log('inside onSubmit file is', this.state.selectedFile);
	  
    let data = new FormData();
     data.append('uid', this.state.uid);	  
     data.append('file', this.state.selectedFile);
	 
	  

    const id = this.state.image_id;   //image_id to update an existing image to a new one

    const request = axios.put(`/api/images/${id}`, data);

    request
      .then(response => {
                  console.log('response after image update', response.data);
                  this.setState({image_url:response.data.url});
      })
      .catch(err => {
                console.log(err.message);
                //this.setState({error:err});
      })

         event.preventDefault();
  };


  render() {
    const { classes } = this.props;

    return (
	    
      <div className="account-settings">
	 <Navigation />
	   <div className="settings-navigation">
	
	    <Typography variant='display1' align='center' gutterBottom>
          Account Settings
        </Typography>
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="left-container">

            <Link to="/chatdashboard">Chat Dashboard</Link>
            <br/>

            <TextField
              id="outlined-name"
              label="Name"
              className={classes.textField}
              value={this.state.name}
              onChange={this.handleChange("name")}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-motto"
              label="Motto"
              className={classes.textField}
              value={this.state.motto}
              onChange={this.handleChange("motto")}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-email"
              label="Email"
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange("email")}
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-phone-number"
              label="Phone Number"
              className={classes.textField}
              value={this.state.phone_number}
              onChange={this.handleChange("phone_number")}
              margin="normal"
              variant="outlined"
            />
            
            <Button variant="outlined" color="primary" className="save-button" onClick={this.handleSubmit} >
              Save
            </Button>
            <Link to="/updatepassword">Update Password</Link>
          </div>
          <div className="right-container">
            <div className="profile-picture">
              <img
                src={this.state.image_url}
                alt="profile picture"
              />
              <h2>Your Profile Photo</h2>
	
	    <form  onSubmit={this.onSubmit}>
              <input
                type="file"
                onChange={this.fileChangedHandler}
              />
	
	    <Button type="submit" variant="outlined" color="primary" className="save-button">
              Save Image
            </Button>
	  </form>
            </div>
          </div>
        </form>
	 </div>   
      </div>
    );
  }
}

//AccountSettings.propTypes = {
 // classes: PropTypes.object.isRequired
//};


//export default withStyles(styles)(AccountSettings);

// const AccountSettings = withFirebase(AccountSettingsBase);


AccountSettingsBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const AccountSettingsComponent = withStyles (styles) (withRouter(withFirebase(AccountSettingsBaseForm)));

export default AccountSettings;

export { AccountSettingsComponent};
