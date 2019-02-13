import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const styles = {
  root: {
    flexGrow: 1
  }
};

class SettingsNavigation extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <NoSsr>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <LinkTab label="Team Billing" />
            <LinkTab label="Account Settings" />
            <LinkTab label="Admin Panel"/>
          </Tabs>
        </Paper>
        {value === 0 && <TabContainer>Team Billing</TabContainer>}
        {value === 1 && <TabContainer>Account Settings</TabContainer>}
        {value === 2 && <TabContainer>Admin Panel</TabContainer>}
      </NoSsr>
    );
  }
}

SettingsNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SettingsNavigation);
