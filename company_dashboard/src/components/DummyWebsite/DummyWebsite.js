import React, { Component } from "react";
import "./DummyWebsite.css";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
	root: {
		flexGrow: 1,
	},
	grow: {
		flexGrow: 1,
	},
	toolBar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20,
	},
	logo: {
		width: 80,
    height: 65,
	},
	navButton: {
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: 20,
	},
	nav: {
		padding: 10,
	},
	parentPaper: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
	},
	home: {
		width: '100%',
		height: 650,
		maxWidth: 500,
		margin: 'auto',
		marginTop: 12,
	},
	plumbing: {
		width: 450,
		height: 300,
		marginTop: 25,
	},
	title: {
		fontSize: 26,
		fontWeight: 'bold',
		margin: 15,
	},
	content: {
		width: 450,
		height: 300,
		margin: 30,
		textAlign: 'justify',
	},
	reasons: {
		width: '100%',
		height: 250,
	},
	heading: {
		fontSize: 35,
		margin: 50,
	},
	columns: {
		display: 'flex',

	},
	footer: {
		height: 100,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
    backgroundColor: '#fafafa',
    color: '#616161',
    marginTop: 30,
    // fontWeight: 'bold',
	},
};

class DummyWebsite extends Component {

	render() {
		const { classes } = this.props;

		return (
			<div className={classes.root}>
				<AppBar position='static'>
					<Toolbar className={classes.toolBar}>
						<IconButton className={classes.menuButton} color='inherit' aria-label='Menu'>
							<img
                className={classes.logo}
                src={require("../images/Joe's_Plumbing.png")}
                alt="logo"
              />
						</IconButton>
							<div className={classes.navButton}>
								<p className={classes.nav}>Home</p>
								<p className={classes.nav}>About</p>
								<p className={classes.nav}>Services</p>
								<p className={classes.nav}>Products</p>
								<p className={classes.nav}>Blog</p>
								<p className={classes.nav}>Make Appointment</p>
							</div>
					</Toolbar>
				</AppBar>

				<Grid container spacing={24}>
          {/* <Grid item xs={12}> */}
            <Paper className={classes.reasons}>
              <Typography className={classes.heading} variant='h3' gutterBottom>
                Why Use Joe's Plumbing?
              </Typography>
          
              <div className={classes.columns}>
               <Grid item xs={12} sm={4}>
                  <div className={classes.benefits}>
                    <h3 className={classes.reason}>Upfront, Flat Rate Pricing <i class="fas fa-wrench"></i></h3>
                  </div>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <div className={classes.benefits}>
                    <h3 className={classes.reason}>Never an Overtime Charge <i class="fas fa-wrench"></i></h3>
                  </div>
                </Grid>
								<Grid item xs={12} sm={4}>
                  <div className={classes.benefits}>
                    <h3 className={classes.reason}>Courtous, Uniformed Professionals <i class="fas fa-wrench"></i></h3>
                  </div>
                </Grid>
							</div>
            </Paper>
          {/* </Grid> */}
        </Grid>

				<Grid container spacing={24}>
					<Grid item xs={12}>
						<Paper className={classes.parentPaper}>
							<Paper className={classes.home}>
								<img
									className={classes.plumbing}
									src={require("../images/plumbing.jpg")}
									alt='plumbing'
								/>
								<Typography className={classes.title}>
									Welcome to Joe's Plumbing
								</Typography>
								<p className={classes.content}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate tortor laoreet elit semper tempor. Fusce eleifend, nisi non sodales convallis, leo sem dapibus nulla, non condimentum arcu diam non lectus. Ut iaculis sagittis ligula non hendrerit. Fusce aliquet libero quis pretium consequat. Ut metus lectus, vehicula sed mi a, condimentum elementum tortor. Fusce eu libero metus. Nulla pellentesque nisl dolor, at sagittis libero porta commodo. Nam libero nunc, malesuada a rutrum ut, tristique vitae nunc. Aliquam commodo mauris id nisl sagittis malesuada. Donec ut iaculis nisl, ultrices dignissim tellus. Mauris lacinia arcu ipsum. Maecenas id tincidunt dui.
								</p>
							</Paper>

							<Paper className={classes.home}>
								<img
									className={classes.plumbing}
									src={require("../images/handshake.jpg")}
									alt='plumbing'
								/>
								<Typography className={classes.title}>
									Great Customer Service
								</Typography>
								<p className={classes.content}>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate tortor laoreet elit semper tempor. Fusce eleifend, nisi non sodales convallis, leo sem dapibus nulla, non condimentum arcu diam non lectus. Ut iaculis sagittis ligula non hendrerit. Fusce aliquet libero quis pretium consequat. Ut metus lectus, vehicula sed mi a, condimentum elementum tortor. Fusce eu libero metus. Nulla pellentesque nisl dolor, at sagittis libero porta commodo. Nam libero nunc, malesuada a rutrum ut, tristique vitae nunc. Aliquam commodo mauris id nisl sagittis malesuada. Donec ut iaculis nisl, ultrices dignissim tellus. Mauris lacinia arcu ipsum. Maecenas id tincidunt dui.
								</p>
							</Paper>

						</Paper>
					</Grid>
				</Grid>

				
						{/* <Button className="webChatAppBtn">Chat!</Button> <iframe className="wcaIFRAME"></iframe> */}
				

				<Grid container spacing={24}>
					<Grid item xs={12} className={classes.footer}>
						<Paper className={classes.copyright} class='copyright'>&copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved
							<Button className="webChatAppBtn">Chat!</Button> <iframe className="wcaIFRAME"></iframe>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}
}

DummyWebsite.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DummyWebsite);

// class DummyWebsite extends Component {
//     render() {
//         return (
//             <div className="dummy-website">
//                 <div className="dummy-top-info">
//                     <h1>Joes Plumbing</h1>
//                     <p>10800 Greene Street</p>
//                     <p>1-800-456-7890</p>
//                     <p>Monday-Saturday 9:00-5:00</p>
//                 </div>
//                 <div className="dummy-navigation-container">
//                     <p className="navigation-link">HOME</p>
//                     <p className="navigation-link">ABOUT</p>
//                     <p className="navigation-link">SERVICES</p>
//                     <p className="navigation-link">PRODUCTS</p>
//                     <p className="navigation-link">BLOG</p>
//                     <p className="navigation-link">GET APPOINTMENT</p>
//                 </div>
//                 <div className="dummy-info">
//                     <h3>Joe's Plumbing</h3>
//                     <ul>
//                         <li>Upfront, Flat Rate Pricing</li>
//                         <li>Never an Overtime Charge</li>
//                         <li>Courtous, Uniformed Professionals</li>
//                     </ul>
// 		<Button className="webChatAppBtn">Chat!</Button> <iframe className="wcaIFRAME"></iframe>
//                 </div>
//             </div>
//         );
//     }
// }

// export default DummyWebsite;
