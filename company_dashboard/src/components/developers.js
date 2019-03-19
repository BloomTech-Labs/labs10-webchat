import React, { Component } from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    flexGrow: 1,
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
    marginTop: 25,
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
});

class Developers extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>  

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
              &copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved
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
