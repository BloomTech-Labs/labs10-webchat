import React from "react";
import { withFirebase } from "../Firebase";
import { FirebaseContext } from '../Firebase';
import { Link, withRouter, Route} from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from '@material-ui/core/IconButton';
import UpdatePassword from './UpdatePassword';
import axios from 'axios';
import Navigation from '../Navigation'
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
constructor(props) {
super(props);  
	
this.state = {
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
  }
};
  componentDidMount() {

//check if a user is signed in or signed out
this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {

        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

        console.log("idToken after in Account Settings: ", idToken);
        axios.defaults.headers.common['Authorization'] = idToken;

    //using allDetails endpoint instead of getbyUID since image_url wasn't present in getByUID endpoint, allDetails endpoints uses innerJoin to get all the rep details as well as image_url, instead of making 2 different axios calls, one for image and one for reps

    const request = axios.get("/api/reps/alldetails");

    request.then(response => {
      console.log("Inside Account Settings alldetails response: ", response.data);
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
    .catch(error => {            // if Firebase getIdToken throws an error
        console.log(error.message);
              this.setState({ error:error });
      })
    })
	}
    else {
                 this.props.history.push('/repslogin'); //if user is signed out redirect to login page
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
    const user = {
      name: this.state.name,
      phone_number: this.state.phone_number,
      motto: this.state.motto,
      email: this.state.email,
    };
	  

    const request = axios.put('/api/reps/updaterepinfo', user);

    request
      .then(response => {
        console.log("response from updated is", response.data);
	this.setState({
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        motto: response.data.motto,
       });      
      })
      .catch(err => {
        console.log(err.message);
      });
	
      event.preventDefault(); 
  };

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
      <div className="account-settings-container">
        <Navigation />
      <div className="account-settings">
          <div className="left-container">
            
	    <form onSubmit={this.handleSubmit}>
            <h2>Edit Account Information</h2>
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
              InputProps={{
            readOnly: true,
          }}
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

            <Button variant="outlined" color="primary" className="save-button" type="submit" >
              Save
            </Button>
          </form>
          <Link to="/updatepassword">Update Password</Link>
          </div>
          <div className="right-container">
            <div className="profile-picture">
              <img
                src={this.state.image_url}
                alt="profile picture"
              />
              <h2>Your Profile Photo</h2>

	    <form className="image-upload" onSubmit={this.onSubmit}>
        <input
        accept="image/*"
        id="outlined-button-file"
        type="file"
        onChange={this.fileChangedHandler}
      />
      <label htmlFor="outlined-button-file">
        <Button type="submit" variant="outlined" component="span" color="primary" className={classes.button}>
          Upload
        </Button>
      </label>
	    <Button type="submit" variant="outlined" color="primary" className="save-button">
              Save Image
            </Button>
	         </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//AccountSettings.propTypes = {
//  classes: PropTypes.object.isRequired
//};


//export default withStyles(styles)(AccountSettings);


AccountSettingsBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

const AccountSettingsComponent = withStyles (styles) (withRouter(withFirebase(AccountSettingsBaseForm)));

export default AccountSettings;

export { AccountSettingsComponent};
