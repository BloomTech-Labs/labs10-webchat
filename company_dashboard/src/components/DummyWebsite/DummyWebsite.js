import React, { Component } from "react";
import "./DummyWebsite.css";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
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
	logo: {
		width: 80,
		height: 65,
		marginLeft: -10,
		marginTop: -12,
	},
	navButton: {
		display: 'flex',
		justifyContent: 'space-between',
		fontSize: 18,
	},
	nav: {
		padding: 12,
	},
	parentPaper: {
		margin: 'auto',
		marginTop: 20,
		display: 'flex',
		justifyContent: 'space-around',
			[theme.breakpoints.down('sm')]: {
				// backgroundColor: 'purple',
				width: '100%',
				flexDirection: 'column',
			},
	},
	home: {
		width: '100%',
		height: 650,
		maxWidth: 500,
		margin: 'auto',
		marginTop: 12,
			// [theme.breakpoints.down('sm')]: {
			// 	flexDirection: 'column',
			// },
	},
	plumbing: {
		width: 450,
		height: 300,
		marginTop: 25,
			[theme.breakpoints.down('sm')]: {
				width: 350,
				height: 250,
			},
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
			[theme.breakpoints.down('sm')]: {
				width: 350,
				marginTop: 10,
			},
	},
	reasons: {
		width: '100%',
		height: 250,
			[theme.breakpoints.down('sm')]: {
				// backgroundColor: 'gray',
				height: 370,
			},
	},
	heading: {
		fontSize: 35,
		margin: 50,
	},
	columns: {
		display: 'flex',
			[theme.breakpoints.down('sm')]: {
				flexDirection: 'column',
			}
	},
	footer: {
		width: '100%',
		height: 200,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-evenly',
    backgroundColor: '#fafafa',
		color: '#616161',
		marginTop: 50,
		marginBottom: 0,
			[theme.breakpoints.down('sm')]: {
				// backgroundColor: 'purple',
				flexDirection: 'column',
				height: 270,
			},
	},
	info: {
		fontSize: 20,
			[theme.breakpoints.down('sm')]: {
				// backgroundColor: 'orange',
				fontSize: 16,
				fontWeight: 'bold',
			},
	},
	description: {
		fontSize: 16,
			[theme.breakpoints.down('sm')]: {
				// backgroundColor: 'green',
				fontSize: 14,
			},
	},
});


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
					{/* <Grid item xs={12}> */}
						<div className={classes.parentPaper}>
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
						</div>
					{/* </Grid> */}
				</Grid>
				
				<Grid container spacing={24}>
					<Paper className={classes.footer}>
						<div className={classes.location}>
							<Typography className={classes.info} variant="title" gutterBottom>
								Location
							</Typography>
							<Typography className={classes.description} component="h2" variant="display1" gutterBottom>
								108 Greene St
								<br/>
								New York, NY 10012
							</Typography>
						</div>

						<div className={classes.contact}>
							<Typography className={classes.info} variant="title" gutterBottom>
								Contact Us
							</Typography>
							<Typography className={classes.description} component="h2" variant="display1" gutterBottom>
								1-800-456-7890
							</Typography>
						</div>

						<div className={classes.hours}>
							<Typography className={classes.info} variant="title" gutterBottom>
								Office Hours
							</Typography>
							<Typography className={classes.description} component="h2" variant="display1" gutterBottom>
								Monday - Saturday
								<br/>
								9:00AM - 5:00PM
							</Typography>
						</div>
						<Button className="webChatAppBtn">Chat!</Button> <iframe className="wcaIFRAME"></iframe>
					</Paper>
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
