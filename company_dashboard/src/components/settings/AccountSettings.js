import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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

class AccountSettings extends React.Component {
  state = {
    name: "Customer Name",
    number: "770-867-5309",
    motto: "The best customer service ever!",
    email: 'email@email.com'
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="account-settings">
        <form noValidate autoComplete="off">
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
              value={this.state.number}
              onChange={this.handleChange("phone")}
              margin="normal"
              variant="outlined"
            />

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
            <Button variant="outlined" color="primary" className="save-button">
              Save
            </Button>
          </div>
          <div className="right-container">
            <div className="profile-picture">
              <img
                src="https://www.biography.com/.image/t_share/MTIwNjA4NjMzNzYwMjg2MjIw/nicolas-cage-9234498-1-402.jpg"
                alt="profile picture"
              />
              <h2>Your Profile Photo</h2>
              <Button
                variant="outlined"
                color="primary"
                className="upload-button"
              >
                Upload
              </Button>
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
