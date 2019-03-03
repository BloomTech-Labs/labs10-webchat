import React from "react";
import { withFirebase } from "../Firebase";
import { FirebaseContext } from '../Firebase';
import { Link } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from 'axios';
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

// const AccountSettingsPage = () => (
//   <div>
//     <FirebaseContext.Consumer>
//       {firebase => <AccountSettings firebase={firebase} />}
//     </FirebaseContext.Consumer>
//   </div>
// );

class AccountSettings extends React.Component {
  state = {
    name: "",
    email: "",
    phone_number: "",
    motto: "",
    selectedFile: null,
  };

  componentDidMount() {
    const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
      // console.log(response.data);

      this.setState({ 
        name: response.data.name,
        email: response.data.email,
        phone_number: response.data.phone_number,
        motto: response.data.motto,
       });
       console.log(this.state.motto);
    })
    .catch(err => {
      console.log(err.message);
      this.setState({ error: err });
    })
  }

  //Sets Input to state
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  //Sets selectedFile in state after selecting an image
  fileChangedHandler = (event) => {
    this.setState({ selectedFile: event.target.file });
  };
  //In the future will upload to file to the database
  uploadHandler = () => {
    console.log(this.state.selectedFile);
  };


  render() {
    const { classes } = this.props;

    return (
      <div className="account-settings">
        <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
          <div className="left-container">
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
              onChange={this.handleChange("phone")}
              margin="normal"
              variant="outlined"
            />
<<<<<<< HEAD

            <TextField
              id="outlined-old-password-input"
              label="Old Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
            />

            <TextField
              id="outlined-new-password-input"
              label="New Password"
              className={classes.textField}
              type="password"
              margin="normal"
              variant="outlined"
            />

=======
            
>>>>>>> be7250b83f18da70ac87d40ec324e02d1ebae293
            <Button variant="outlined" color="primary" className="save-button">
              Save
            </Button>
            <Link to="/updatepassword">Update Password</Link>
          </div>
          <div className="right-container">
            <div className="profile-picture">
              <img
                src="https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzYwMjg2MjIw/nicolas-cage-9234498-1-402.jpg"
                alt="profile picture"
              />
              <h2>Your Profile Photo</h2>
              <input
                accept="image/*"
                id="raised-button-file"
                type="file"
                onChange={this.fileChangedHandler}
              />
              <label>
                <Button raised component="span" onClick={this.uploadHandler}>
                  Upload
                </Button>
              </label>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(AccountSettings);

// const AccountSettings = withFirebase(AccountSettingsBase);

// AccountSettings.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(AccountSettingsPage);

// export { AccountSettings };