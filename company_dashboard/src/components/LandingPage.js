import React, { Component } from "react";
import "./LandingPage.css";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: 'green',
    height: 1295,
  },
  appbar: {
    position: 'fixed',
    backgroundColor: '#323439',
  },
  toolbar: {
    height: 70,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: 70,
    height: 70,
    marginLeft: -5,
      [theme.breakpoints.down('sm')]: {
        width: 60,
        height: 60,
      },
  },
  chattrLogo: {
	  width: 200,
	  height: 200,
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
  signupNav: {
    color: '#64dd17',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        padding: 2,
        marginLeft: 25,
        // backgroundColor: 'orange',
      },
  },
  home: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
    height: 425,
    marginTop: 80,
    // backgroundColor: 'red',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 72,
        height: 720,
        // backgroundColor: 'orange',
      },
  },
  info: {
    width: 480,
    height: 280,
    marginTop: 50,
    marginLeft: 25,
    // backgroundColor: 'orange',
      [theme.breakpoints.down('sm')]: {
        width: 300,
        height: 420,
        marginTop: -70,
        // backgroundColor: 'red',
      },
  },
  main: {
    letterSpacing: 1,
      [theme.breakpoints.down('sm')]: {
        letterSpacing: 0,
        fontSize: 28,
      },
  },
  landing: {
    width: 500,
    marginTop: 20,
      [theme.breakpoints.down('sm')]: {
        width: 350,
        marginTop: -80,
      },
      [theme.breakpoints.up('md')]: {
        width: 450,
      },
  },
  reasons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 500,
    // backgroundColor: 'blue',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'purple',
        height: 680,
        marginTop: 12,
      },
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
		letterSpacing: 2,
    marginTop: 25,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'blue',
        width: 300,
        fontSize: 26,
      }
  },
  comment: {
    color: 'green',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
		justifyContent: 'space-between',
    marginTop: 25,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'orange',
        flexDirection: 'column',
        height: 520,
      },
      [theme.breakpoints.up('md')]: {
        // backgroundColor: 'orange',
        // margin: 'auto',
        marginTop: 10,
      },
  },
  benefits: {
    width: 290,
    height: 200,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'yellow',
        height: 250,
        marginBottom: 40,
      },
      [theme.breakpoints.up('md')]: {
        // backgroundColor: 'yellow',
        height: 300,
        margin: 50,
      },
	},
	reason: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	description: {
		fontSize: 16,
		fontWeight: 'normal',
    textDecoration: 'none',
    textAlign: 'center',
	},
	pricing: {
		width: '100%',
		height: 250,
		display: 'flex',
		justifyContent: 'space-around',
    // backgroundColor: 'purple',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'green',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 350,
        marginTop: 12,
      },
	},
	subscribe: {
    marginTop: 45,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'orange',
        width: 300,
        marginTop: 0,
      },
  },
  tiers: {
    textAlign: 'justify',
    fontSize: 15,
  },
  tiersInfo: {
    color: '#77bf44',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 15,
      [theme.breakpoints.down('sm')]: {
        fontSize: 15,
      },
  },
	signup: {
    marginTop: 35,
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
	footer: {
    width: '100%',
		height: 100,
		display: 'flex',
		alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fafafa',
    color: '#616161',
    // marginTop: 200,
    // fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'black',
        width: '100%',
        height: 200,
        marginTop: 12,
        marginLeft: 10,
        marginRight: 10,
        lineHeight: 2,
      },
  },
  copyright: {
    display: 'flex',
    // justifyContent: 'space-between',
    color: 'black',
      [theme.breakpoints.down('sm')]: {
        // color: 'white',
        flexDirection: 'column',
        fontSize: 11,
      },
  },
  meetTeam: {
    marginRight: 90,
    // marginTop: 'auto',
    color: '#1b5e20',
    fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        marginTop: -70,
        fontSize: 15,
      },
  },
  rights: {
      [theme.breakpoints.down('sm')]: {
        marginBottom: -10,
      },
  },
  terms: {
    marginLeft: 90,
    // marginTop: 'auto',
    color: '#1b5e20',
    fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        marginTop: -50,
        fontSize: 15,
      },
  },
})

class LandingPage extends Component {
  constructor(props){
  super(props);
}	
	
render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {/* <img
                className={classes.logo}
                src={require("../images/logo.png")}
                alt="logo"
              /> */}
            </Typography>
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
            <Paper className={classes.home}>
              <div className={classes.info}>
                <img
                  className={classes.chattrLogo}
                  src={require("./images/chattrIconLogo.png")}
                  alt="chattrLogo"
                />
                <Typography className={classes.main} component='h2' variant='h5' gutterBottom>
                  welcome to chattr, the new way to chat with your customers
                </Typography>
                {/* <Button variant="outlined" color="primary" className={classes.signup}>
                  <Link to={ROUTES.REP_REGISTER}>Get Started</Link>
                </Button> */}
                <a href='/repregister'>
                  <p className={classes.signup}>Get Started</p>
                </a>
              </div>
                <img
                  className={classes.landing}
                  src={require("./images/chattrWindow.jpg")}
                  alt="landingImage"
                />
            </Paper>
          {/* </Grid> */}
        </Grid>

        <Grid container spacing={24}>
          {/* <Grid item xs={12}> */}
            <Paper className={classes.reasons}>
              <Typography className={classes.heading} variant='h3' gutterBottom>
                Why Use Chattr?
              </Typography>

              <div className={classes.columns}>
                {/* <Grid item xs={12} sm={4}>
                  <Paper className={classes.benefits}>Track Conversations
                    <br/>
                    <p>Chattr lets you keep track and assign conversations so that the conversations doesn't get lost.</p>
                  </Paper>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                  <div className={classes.benefits}>
                    <i class="fab fa-rocketchat fa-7x" style={{color: '#77bf44'}}></i>
                    <h3 className={classes.reason}>Quick Response</h3>
                    <p className={classes.description}>With live chat, companies can quickly connect customers to customer service reps who can manage
                    conversations with multiple customers.</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className={classes.benefits}>
                    <i class="fas fa-users fa-7x" style={{color: '#77bf44'}}></i>
                    <h3 className={classes.reason}>Engage customers</h3>
                    <p className={classes.description}>Chattr are also used by sales and marketing teams to engage with interested potential customers.</p>
                  </div>
                </Grid>
              </div>
            </Paper>
          {/* </Grid> */}
        </Grid>

        <Grid container spacing={24}>
          {/* <Grid item xs={12}> */}
            <Paper className={classes.pricing}>
              <div className={classes.subscribe}>
                <Typography variant='h4' gutterBottom>
                  Subscribe to Chattr
                </Typography>
                <Typography className={classes.tiers} variant='body1' gutterBottom>
                  - Try for Free <br/>
                  - Subscribe Basic for $30/mo <br/>
                  - Subscribe Enterprise for $50/mo <br/>
                </Typography>
              </div>
              <a href='/repregister'>
                <p className={classes.signup}>Get Started</p>
              </a>
            </Paper>
          {/* </Grid> */}
        </Grid>

				<Grid container spacing={24}>
					<Grid item xs={12} className={classes.footer}>
						<div className={classes.copyright}>
              <a href='/developers'>
                <p className={classes.meetTeam}>Developers</p>
              </a>
              <p className={classes.rights}>&copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved</p>
              <a href='#'>
                <p className={classes.terms}>Terms</p>
              </a>
            </div>
					</Grid>
				</Grid>
      </div>
    );
  }
}

LandingPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LandingPage);
