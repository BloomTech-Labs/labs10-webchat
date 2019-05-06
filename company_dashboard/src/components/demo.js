import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: 'green',
    height: 1295,
  },
  appBar: {
    position: 'relative',
    backgroundColor: '#323439',
  },
  toolbarTitle: {
    flex: 1,
  },
  logo: {
    width: 65,
    height: 60,
    marginLeft: -3,
    marginTop: -5,
    display: 'flex',
      [theme.breakpoints.down('sm')]: {
        width: 60,
        height: 60,
      },
  },
  navButton: {
    // backgroundColor: 'orange',
    display: 'flex',
    paddingRight: 50,
    color: 'white',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        padding: 2,
        marginLeft: 25,
        // backgroundColor: 'orange',
      },
  },
  activeButton: {
    color: '#64dd17',
    paddingRight: 50,
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        padding: 2,
        marginLeft: 25,
        // backgroundColor: 'orange',
      },
  },
  testing: {
    width: '100%',
    // backgroundColor: 'orange',
  },
  directions: {
    fontSize: 35,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginTop: 25,
  },
  columns: {
    display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
      [theme.breakpoints.down('sm')]: {
        display: 'flex',
        flexDirection: 'column',
      },
  },
  direction: {
    // backgroundColor: 'orange',
    margin: 'auto',
    width: 280,
  },
  side: {
    fontSize: 20,
    fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        marginTop: 45,
      },
  },
  repLogin: {
    // backgroundColor: 'green',
    // textAlign: 'justify',
    margin: 'auto',
    width: 300,
  },
  login: {
    // backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 250,
    margin: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  signIn: {
    margin: 'auto',
    width: 130,
    height: 50,
    color: '#77bf44',
    fontWeight: 'bold',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    border: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  password: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  siginInfo: {
    fontSize: 16,
    fontWeight: 'normal',
    marginLeft: 8,
  },
  customerChat: {
    // backgroundColor: 'yellow',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: 350,
    margin: 'auto',
    fontSize: 20,
    fontWeight: 'bold',
  },
  joes: {
    margin: 'auto',
    marginRight: 80,
    width: 130,
    height: 50,
    color: '#77bf44',
    fontWeight: 'bold',
    fontSize: 18,
    borderStyle: 'solid',
    borderRadius: 5,
    border: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class Demo extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.root}>
          <AppBar position="static" style={{color: '#303f9f'}} className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
                <Link to={ROUTES.LANDING}>
                  <img 
                    className={classes.logo} 
                    src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" 
                    alt="logo" 
                  />
                </Link>
              </Typography>
              <a href='/demo'>
                <p className={classes.activeButton}>DEMO</p>
              </a>
              <a href='/pricing'>
                <p className={classes.navButton}>PRICING</p>
              </a>
              <a href='/repslogin'>
                <p className={classes.navButton}>SIGN IN</p>
              </a>
              <a href='/repregister'>
                <p className={classes.navButton}>SIGN UP</p>
              </a>
            </Toolbar>
          </AppBar>

          <Grid container spacing={24}>
            {/* <Grid item xs={12}> */}
              <div className={classes.testing}>
                <Typography className={classes.directions} variant='h3' gutterBottom>
                  Test Chattr
                </Typography>

                <div className={classes.columns}>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.direction}>
                      <h3 className={classes.side}>Company Representative</h3>
                      <div className={classes.repLogin}>
                        <p className={classes.login}>Login:
                          <a href='/repslogin' target='_blank'>
                            <p className={classes.signIn}>Sign In</p>
                          </a>
                        </p>
                        <p className={classes.email}>Email: 
                          <span className={classes.siginInfo}>joeplumbing1111@gmail.com</span>
                        </p>
                        <p className={classes.password}>Password: 
                          <span className={classes.siginInfo}>Labs10webchat</span>
                        </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className={classes.direction}>
                      <h3 className={classes.side}>Customer Test</h3>
                      <p className={classes.customerChat}>
                        Test chat:
                        <a href='https://plumbingwithjoe.netlify.com/' target='_blank'>
                          <p className={classes.joes}>Customer Page</p>
                        </a>
                      </p>
                    </div>
                  </Grid>
                </div>
              </div>
            {/* </Grid> */}
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Demo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Demo);