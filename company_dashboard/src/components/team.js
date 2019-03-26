import React, { Component } from "react";
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
  },
  appbar: {
    position: 'fixed',
  },
  toolbar: {
    height: 70,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: 65,
    height: 60,
    marginLeft: -25,
    marginTop: -6,
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
  signupNav: {
    color: '#64dd17',
      [theme.breakpoints.down('sm')]: {
        fontSize: 14,
        padding: 2,
        marginLeft: 25,
        // backgroundColor: 'orange',
      },
  },
  developers: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'green',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'indigo',
        width: 410,
        marginTop: 12,
      }
  },
  devHeading: {
    fontSize: 35,
    fontWeight: 'bold',
		letterSpacing: 2,
    marginTop: 100,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'blue',
        width: 300,
        fontSize: 26,
        margin: 'auto',
        marginTop: 40,
      },
  },
  top: {
    display: 'flex',
    marginTop: 20,
    padding: 20,
    // backgroundColor: 'purple',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'purple',
        flexDirection: 'column',
      },
  },
  bottom: {
    display: 'flex',
    margin: 'auto',
    marginTop: 30,
    padding: 20,
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'orange',
        flexDirection: 'column',
        marginTop: 0,
      },
  },
  developer: {
    fontSize: 20,
    fontWeight: 'bold',
    width: 300,
    height: 350,
    margin: 'auto',
    // backgroundColor: 'orange',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'brown',
        marginBottom: 25,
        height: 270,
      },
  },
  pic: {
    width: 250,
    height: 250,
    marginTop: 15,
    marginBottom: 15,
      [theme.breakpoints.down('sm')]: {
        width: 175,
        height: 175,
      },
  },
  icon: {
    marginBottom: 25,
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
  netlify: {
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
  footerNetlify: {
    marginLeft: 90,
    // marginTop: 'auto',
    width: 80,
    height: 80,
    color: '#1b5e20',
    fontWeight: 'bold',
      [theme.breakpoints.down('sm')]: {
        margin: 'auto',
        marginTop: -50,
        fontSize: 15,
      },
  },
});

class Developers extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}> 
        <AppBar className={classes.appbar}>
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              {/* <MenuIcon /> */}
              <img 
                className={classes.logo} 
                src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" 
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
            <a href='/pricing'>
              <p className={classes.navButton}>PRICING</p>
            </a>
            <a href='/repslogin'>
              <p className={classes.navButton}>SIGN IN</p>
            </a>
            <a href='/repregister'>
              <p className={classes.signupNav}>SIGN UP</p>
            </a>
          </Toolbar>
        </AppBar> 

        <Grid container spacing={24}>
          <Paper className={classes.developers}>
            <Grid item xs={12}>
              <div>
                <Typography className={classes.devHeading} variant='h3' gutterBottom>
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
          </Paper>
        </Grid>

				<Grid container spacing={24}>
					<Grid item xs={12} className={classes.footer}>
						<div className={classes.copyright}>
              <a href='/developers'>
                <p className={classes.netlify}>Netlify</p>
              </a>
              <p className={classes.rights}> &copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved</p>
              <br/>
              <img
                className={classes.footerNetlify}
                src={require("./images/logomark.png")}
                alt="Netlify logo"
              />
            </div>
					</Grid>
				</Grid>
      </div>
    );
  }
}

Developers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Developers);
