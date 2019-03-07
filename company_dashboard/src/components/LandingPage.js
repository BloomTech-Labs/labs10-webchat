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
  toolbar: {
    height: 90,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  logo: {
    width: 80,
    height: 55,
    marginTop: -15,
  },
  netlify: {
    width: 70,
    height: 70,
    marginTop: -15,
  },
  home: {
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    width: '100%',
		height: 425,
		// backgroundColor: 'red',
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
  reasons: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    height: 500,
    // backgroundColor: 'blue',
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
		letterSpacing: 2,
		marginTop: 25,
  },
  comment: {
    color: 'green',
  },
  columns: {
    display: 'flex',
    flexDirection: 'row',
		justifyContent: 'space-between',
    marginTop: 25,
  },
  benefits: {
    width: 290,
		height: 200,
	},
	reason: {
		fontSize: 20,
		fontWeight: 'bold',
		textDecoration: 'underline',
	},
	description: {
		fontSize: 16,
		fontWeight: 'normal',
    textDecoration: 'none',
    textAlign: 'center',
	},
	pricing: {
		width: '100%',
		height: 200,
		display: 'flex',
		justifyContent: 'space-around',
		// backgroundColor: 'purple',
	},
	subscribe: {
		marginTop: 45,
	},
	signup: {
		marginTop: 55,
		height: 50,
	},
	developers: {
    width: '100%',
    height: '100%',
		// backgroundColor: 'green',
  },
  top: {
    display: 'flex',
    margin: 'auto',
    marginTop: 20,
    padding: 20,
  },
  bottom: {
    display: 'flex',
    margin: 'auto',
    marginTop: 30,
    padding: 20,
  },
  developer: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 300,
  },
  pic: {
    width: 250,
    height: 250,
    marginTop: 15,
    marginBottom: 15,
  },
  icon: {
    marginBottom: 25,
	},
	footer: {
		height: 100,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
    marginTop: 30,
    // fontWeight: 'bold',
	},
})

class LandingPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
              <img
                className={classes.logo}
                src={require("../images/logo.png")}
                alt="logo"
              />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              {/* <img
                className={classes.logo}
                src={require("../images/logo.png")}
                alt="logo"
              /> */}
            </Typography>
            <Button size="large" color="primary"> 
              <Link to={ROUTES.BILLING}>Pricing</Link>
            </Button>
            <Button size="large" color="primary">
              <Link to={ROUTES.REPS_LOGIN}>Sign In</Link>
            </Button>
            <Button size="large" color="primary">
              <Link to={ROUTES.REP_REGISTER}>Sign Up</Link>
            </Button>
            <img
              className={classes.netlify}
              src={require("./images/logomark.png")}
              alt="Netlify logo"
            />
          </Toolbar>
        </AppBar>
        
        <Grid container spacing={24}>
          {/* <Grid item xs={12}> */}
            <Paper className={classes.home}>
              <div className={classes.info}>
                <Typography className={classes.main} component='h2' variant='h3' gutterBottom>
                  Welcome to Chattr, the new way to chat with your customers
                </Typography>
                <Button variant="outlined" color="primary" className={classes.signup}>
                  <Link to={ROUTES.REP_REGISTER}>Get Started</Link>
                </Button>
              </div>
                <img
                  className={classes.landing}
                  src={require("./images/landing.png")}
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
                <i class="far fa-comments fa-2x" style={{color: '#64b5f6'}}></i>
              </Typography>
          
              <div className={classes.columns}>
                {/* <Grid item xs={12} sm={4}>
                  <Paper className={classes.benefits}>Track Conversations
                    <br/>
                    <p>Chattr lets you keep track and assign conversations so that the conversations doesn't get lost.</p>
                  </Paper>
                </Grid> */}
                <Grid item xs={12} sm={4}>
                  <div className={classes.benefits}>
                    <i class="fab fa-rocketchat fa-7x" style={{color: '#b71c1c'}}></i>
                    <h3 className={classes.reason}>Quick Response</h3>
                    <p className={classes.description}>With live chat, companies can quickly connect customers to customer service reps who can manage
                    conversations with multiple customers.</p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.benefits}>
                    <i class="fas fa-users fa-7x" style={{color: '#607d8b'}}></i>
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
                <Typography variant='body1' gutterBottom>
                  All companies get our features for just one payment of $30
                </Typography>
              </div>
              <Button variant="outlined" color="primary" className={classes.signup}>
                <Link to={ROUTES.REP_REGISTER}>Get Started</Link>
              </Button>
            </Paper>
          {/* </Grid> */}
        </Grid>

        <Grid container spacing={24} className={classes.developers}>
          <Grid item xs={12}>
            <div>
              <Typography className={classes.heading} variant='h3' gutterBottom>
                Our Developers
              </Typography>
            </div>
          </Grid>
          <div className={classes.top}>
            <Grid item xs={12} sm={6}>
              <div className={classes.developer}>Sukhada Gholba
                <br/>
                <img
                  className={classes.pic}
                  src={require("./images/Sukhada.jpg")}
                  alt="profilePic"
                />
                <br/>
                <a href='https://github.com/sukhadagholba' className={classes.icon} target='_blank'>
                  <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.developer}>Cameron Ray
                <br/>
                <img
                  className={classes.pic}
                  src={require("./images/Cameron.png")}
                  alt="profilePic"
                />
                <br/>
                <a href='https://github.com/upsmancsr' className={classes.icon} target='_blank'>
                  <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </Grid>
          </div>
          <div className={classes.bottom}>
            <Grid item xs={12} sm={4}>
              <div className={classes.developer}>Linda Yang
                <br/>
                <img
                  className={classes.pic}
                  src={require("./images/Linda.png")}
                  alt="profilePic"
                />
                <br/>
                <a href='https://github.com/lyang9' className={classes.icon} target='_blank'>
                  <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.developer}>Wonjae Hwang
                <br/>
                <img
                  className={classes.pic}
                  src={require("./images/Wonjae.png")}
                  alt="profilePic"
                />
                <br/>
                <a href='https://github.com/verydecent' className={classes.icon} target='_blank'>
                  <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className={classes.developer}>Jennifer Player
                <br/>
                <img
                  className={classes.pic}
                  src={require("./images/Jennifer.jpg")}
                  alt="profilePic"
                />
                <br/>
                <a href='https://github.com/chainchompa' className={classes.icon} target='_blank'>
                  <i class="fab fa-github fa-lg"></i>
                </a>
              </div>
            </Grid>
          </div>
            {/* </Paper> */}
          {/* </Grid> */}
        </Grid>

				<Grid container spacing={24}>
					<Grid item xs={12} className={classes.footer}>
						<Paper className={classes.copyright} class='copyright'>&copy; Copyright 2019 Labs10 Lambda School - All rights reserved</Paper>
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
