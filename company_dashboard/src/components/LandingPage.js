import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  home: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around'
  },
  info: {
    width: 480,
    height: 250,
    marginTop: 50,
    marginLeft: 25, 
  },
  main: {
    letterSpacing: 2,
  },
  upload: {
    margin: 'auto',
    marginTop: 20,
  },
  landing: {
    width: 500,
    marginTop: 20,
  },
  reason: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 25,
  },
  benefits: {
    width: 200,
    height: 150,
  }
})

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Chattr
            </Typography>
            <Button size="large" color="primary"> 
              <Link to={ROUTES.BILLING}>Billing</Link>
            </Button>
            <Button size="large" color="primary">
              <Link to={ROUTES.REPS_LOGIN}>Sign In</Link>
            </Button>
            <Button size="large" color="primary">
              <Link to={ROUTES.REP_REGISTER}>Sign Up</Link>
            </Button>
            <img
              className="netlify-logo"
              src={require("./images/logomark.png")}
              alt="Netlify logo"
            />
          </Toolbar>
        </AppBar>
        
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.home}>
              <div className={classes.info}>
                <Typography className={classes.main} component='h2' variant='h3' gutterBottom>
                  Welcome to Chattr, the new way to chat with your customers
                </Typography>
                <Button variant="outlined" color="primary" className={classes.upload}>
                  <Link to={ROUTES.REP_REGISTER}>Get Started</Link>
                </Button>
              </div>
                <img
                  className={classes.landing}
                  src={require("./images/landing.png")}
                  alt="landingImage"
                />
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.reason}>
            <Typography className={classes.heading} variant='h3' gutterBottom>
              Why Use Chattr?
            </Typography>
          
            <div className={classes.columns}>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.benefits}>Fast response</Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.benefits}>Quick response</Paper>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Paper className={classes.benefits}>Receive response</Paper>
              </Grid>
            </div>
          </Grid>
        </Grid>  

        <Grid container spacing={24}>

        </Grid>
      </div>
      
      
      // <div className="landing-page">
      //   <div className="navigation-container">
      //     <Button size="large">
      //       <Link to={ROUTES.REPS_LOGIN}>Sign In</Link>
      //     </Button>
      //     <Button size="large">
      //       <Link to={ROUTES.REP_REGISTER}>Sign Up</Link>
      //     </Button>
      //     <img
      //       className="netlify-logo"
      //       src={require("./images/logomark.png")}
      //       alt="Netlify logo"
      //     />
      //   </div>
      //   <div className="landing-info">
      //     <h1>Chattr</h1>
      //     <p>
      //       Welcome to Chattr, the new way to chat with your customers.
      //     </p>
      //     <Button variant="outlined" color="primary" className="upload-button">
      //       Get Started
      //     </Button>
      //   </div>
      // </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
