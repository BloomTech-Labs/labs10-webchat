import React from "react";
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import NoSsr from "@material-ui/core/NoSsr";
import Typography from "@material-ui/core/Typography";
import axios from 'axios';
import { withFirebase } from "../Firebase";
import { FirebaseContext } from '../Firebase';
import AccountSettings from "./AccountSettings";
import Billing from "./Pricing";
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
    <Tab label={props.label} component={Link} to={`/${props.name}`}/>	  
  );
}

const styles = {
  root: {
    flexGrow: 1
  }
};


const SettingsNavigation = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <SettingsNavigationComponent firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class SettingsNavigationBaseForm extends React.Component {
  state = {
    value: 0,
    is_admin: null,
    error:null,	  
  };

  componentDidMount() {
	this.props.firebase.auth.onAuthStateChanged(user => {
        if (user) {

        this.props.firebase.auth.currentUser.getIdToken()
        .then(idToken => {

    	axios.defaults.headers.common['Authorization'] = idToken;	  
      
     const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log("Account Settings CDM getByUID response: ", response);
      // console.log(response.data);

       console.log('is admin', response.data.is_admin);	    
      this.setState({
        is_admin: response.data.is_admin
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
                  <LinkTab label="Admin Panel" name="adminpanel" />
                  <LinkTab label="Account Settings" name="accountsettings"/>
                  <LinkTab label="Team Billing" name="billing"/>
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
            {/* <Navigation /> */}
            <div className="settings-navigation">
              <Paper className={classes.root}>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <LinkTab label="Account Settings" name="accountsettings" />
                </Tabs>
              </Paper>
              {value === 0 && <TabContainer><AccountSettings user={this.state.user} /></TabContainer>}
            </div>
          </NoSsr>
        )
      }
    }
}

SettingsNavigationBaseForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(styles)(SettingsNavigation));


const SettingsNavigationComponent = withStyles (styles) (withRouter(withFirebase(SettingsNavigationBaseForm)));


export { SettingsNavigationComponent};

