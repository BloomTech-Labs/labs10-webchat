import React, { Component } from 'react';
import './developers.css';
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
	root: {
    flexGrow: 1,
    // backgroundColor: 'green',
    height: 1085,
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
    width: 65,
    height: 60,
    marginLeft: -25,
    marginTop: -6,
      [theme.breakpoints.down('sm')]: {
        width: 60,
				height: 60,
				marginLeft: -15,
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
              <Link to={ROUTES.LANDING}>
                <img 
                  className={classes.logo} 
                  src="https://tbncdn.freelogodesign.org/cf170e4b-6edc-484b-9bca-ce1c01756b07.png?1552522558297" 
                  alt="logo" 
                />
              </Link>
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
              <p className={classes.navButton}>SIGN UP</p>
            </a>
          </Toolbar>
        </AppBar>
				
				<div className="container">
					<div className="row">
						<div className="heading-title text-center">
							<h3 className="text-uppercase">Meet Our Developers</h3>
						</div>

						<div className='developers'>
							<div className='top'>
								<div className="col-md-4 col-sm-4">
									<div className="team-member">
										<div className="team-img">
											<img 
												src={require("./images/Sukhada.jpg")}
												alt="team member" 
												className="img-responsive"
											/>
										</div>
										<div className="team-hover">
											<div className="desk">
												<h4>Check My Portfolio</h4>
											</div>
											<div className="s-link">
												<a href='https://github.com/sukhadagholba' className='icon' target='_blank'>
													<i class="fab fa-github fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
									<div className="team-title">
										<h5>Sukhada Gholba</h5>
										<span>Web Developer</span>
									</div>
								</div>
								
								<div className="col-md-4 col-sm-4">
									<div className="team-member">
										<div className="team-img">
											<img 
												src={require("./images/Cameron.png")}
												alt="team member" 
												className="img-responsive"
											/>
										</div>
										<div className="team-hover">
											<div className="desk">
												<h4>Check My Portfolio</h4>
											</div>
											<div className="s-link">
												<a href='https://github.com/upsmancsr' className='icon' target='_blank'>
													<i class="fab fa-github fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
									<div className="team-title">
										<h5>Cameron Ray</h5>
										<span>Web Developer</span>
									</div>
								</div>
							</div>

							<div className='bottom'>
								<div className="col-md-4 col-sm-4">
									<div className="team-member">
										<div className="team-img">
											<img 
												src={require("./images/Linda.png")}
												alt="team member" 
												className="img-responsive"
											/>
										</div>
										<div className="team-hover">
											<div className="desk">
												<h4>Check My Portfolio</h4>
											</div>
											<div className="s-link">
												<a href='https://github.com/lyang9' className='icon' target='_blank'>
													<i class="fab fa-github fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
									<div className="team-title">
										<h5>Linda Yang</h5>
										<span>Web Developer</span>
									</div>
								</div>

								<div className="col-md-4 col-sm-4">
									<div className="team-member">
										<div className="team-img">
											<img 
												src={require("./images/Wonjae.png")}
												alt="team member" 
												className="img-responsive"
											/>
										</div>
										<div className="team-hover">
											<div className="desk">
												<h4>Check My Portfolio</h4>
											</div>
											<div className="s-link">
												<a href='https://github.com/verydecent' className='icon' target='_blank'>
													<i class="fab fa-github fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
									<div className="team-title">
										<h5>Wonjae Hwang</h5>
										<span>Web Developer</span>
									</div>
								</div>

								<div className="col-md-4 col-sm-4">
									<div className="team-member">
										<div className="team-img">
											<img 
												src={require("./images/Jennifer.jpg")}
												alt="team member" 
												className="img-responsive"
											/>
										</div>
										<div className="team-hover">
											<div className="desk">
												<h4>Check My Portfolio</h4>
											</div>
											<div className="s-link">
												<a href='https://github.com/chainchompa' className='icon' target='_blank'>
													<i class="fab fa-github fa-lg"></i>
												</a>
											</div>
										</div>
									</div>
									<div className="team-title">
										<h5>Jennifer Player</h5>
										<span>Web Developer</span>
									</div>
								</div>
							</div>
						</div>	
					</div>	

					<div className="footer">
						<div className="copyright">
							<a href='https://www.netlify.com/' target='_blank'>
								<p className="netlify">Netlify</p>
							</a>
							<p className="rights"> &copy; Copyright 2019 Lambda School Lab10 Chattr - All rights reserved</p>
							<br/>
							<img
								className="footerNetlify"
								src={require("./images/logomark.png")}
								alt="Netlify logo"
							/>
						</div>
					</div>

				</div>   
			</div> 
		);
	}
}

Developers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Developers);

