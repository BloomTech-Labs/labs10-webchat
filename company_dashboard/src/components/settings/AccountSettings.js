import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
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
    name: "Cat in the Hat",
    number: "",
    motto: "The best customer service ever!"
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="outlined-email"
          label="Email"
          className={classes.textField}
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
        />

        <TextField
          id="outlined-phone-number"
          label="Phone Number"
          className={classes.textField}
          value={this.state.name}
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
        <Button variant="outlined" color="primary" className="save-button">
          Save
        </Button>
      </form>
    );
  }
}

AccountSettings.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountSettings);
