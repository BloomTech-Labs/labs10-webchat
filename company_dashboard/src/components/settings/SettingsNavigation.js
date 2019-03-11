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
import Navigation from "../Navigation";
import '../Navigation.css'
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
    value: 0,
    is_admin: null
  };

  componentDidMount() {
    const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
      // console.log(response.data);

      this.setState({
        is_admin: response.data.is_admin
      });

    })
      .catch(err => {
        console.log(err.message);
        this.setState({ error: err });
      })
    setTimeout(() => {
      console.log("SettingsNavigation is_admin: ", this.state.is_admin);

    }, 5000)
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    const adminStatus = this.state.is_admin;
    if (adminStatus) {
        return (
          <NoSsr>
            <Navigation />
            <div className="settings-navigation">
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <LinkTab label="Admin Panel" />
                  <LinkTab label="Account Settings" />
                  <LinkTab label="Team Billing" />
                </Tabs>
              </Paper>
              {value === 0 && <TabContainer><AdminPanel user={this.state.user} /></TabContainer>}
              {value === 1 && <TabContainer><AccountSettings user={this.state.user} /></TabContainer>}
              {value === 2 && <TabContainer><Billing /></TabContainer>}
            </div>
          </NoSsr>
        )
      } else {
        return (
          <NoSsr>
            <Navigation />
            <div className="settings-navigation">
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <LinkTab label="Account Settings" />
                </Tabs>
              </Paper>
              {value === 0 && <TabContainer><AccountSettings user={this.state.user} /></TabContainer>}
            </div>
          </NoSsr>
        )
      }
    }
}

SettingsNavigation.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SettingsNavigation));