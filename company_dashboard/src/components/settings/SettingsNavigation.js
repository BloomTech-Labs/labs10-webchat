import React from "react";
import { withRouter } from "react-router-dom"
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';

import AccountSettings from "./AccountSettings";
import Billing from "./Billing";
import AdminPanel from "../Admin/AdminPanel";
import { NavigationFullscreenExit } from "material-ui/svg-icons";

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
    value: 1,
    user: null
  };

  componentDidMount() {
    const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
      // console.log(response.data);

      this.setState({ 
        user: response.data
       });
       console.log(this.state);
    })
    .catch(err => {
      console.log(err.message);
      this.setState({ error: err });
    })
  }

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
        {value === 0 && <TabContainer><Billing /></TabContainer>}
        {value === 1 && <TabContainer><AccountSettings /></TabContainer>}
        {value === 2 && <TabContainer><AdminPanel /></TabContainer>}
      </NoSsr>
    );
  }
}

SettingsNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SettingsNavigation));
