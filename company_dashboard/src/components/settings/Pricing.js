import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";

import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  title: {
      color: '#ffffff',
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
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  content: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  table: {
    margin: 'auto',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'purple',
        width: 300,
      },
  },
  card: {
    [theme.breakpoints.down('sm')]: {
      // backgroundColor: 'green',
    },
  },
  cardHeader: {
    backgroundColor: '#323439',
      [theme.breakpoints.down('sm')]: {
        // backgroundColor: 'orange',
      },
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: ['5 representative', 'Help center access', '24/7 live chat'],
    buttonText: 'Sign up for free',
    buttonVariant: 'outlined',
  },
  {
    title: 'Basic',
    price: '30',
    description: ['10 representatives', 'Help center access', '24/7 live chat'],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },
  {
    title: 'Enterprise',
    price: '50',
    description: ['30 representatives', 'Help center access', '24/7 live chat'],
    buttonText: 'Get Started',
    buttonVariant: 'outlined',
  },
];



class Pricing extends Component {
  state = {
    open: false,
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
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
            <a href='/pricing'>
              <p className={classes.activeButton}>PRICING</p>
            </a>
            <a href='/repslogin'>
              <p className={classes.navButton}>SIGN IN</p>
            </a>
            <a href='/repregister'>
              <p className={classes.navButton}>SIGN UP</p>
            </a>
          </Toolbar>
        </AppBar>
        
        <main className={classes.layout}>
          <div className={classes.content}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Pricing
            </Typography>
            <Typography variant="h6" align="center" color="textSecondary" component="p">
              Chattr is the new way to chat with your customers!
            </Typography>
          </div>
          <Grid container spacing={40} alignItems="flex-end">
            {tiers.map(tier => (
              <Grid className={classes.table} item key={tier.title} sm={tier.title === 'Enterprise' ? 12 : 6} md={4}>
                <Card className={classes.card}>
                  <CardHeader
		    classes={{title: classes.title,}}
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Basic' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        /mo
                      </Typography>
                    </div>
                    {tier.description.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                    >
                      <Link to={ROUTES.REP_REGISTER}>{tier.buttonText}</Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </main>
        
        {/* <Grid container spacing={24}>
					<Grid item xs={12} className={classes.footer}>
						<Paper className={classes.copyright} class='copyright'>&copy; Copyright 2019 Labs10 Lambda School - All rights reserved</Paper>
					</Grid>
				</Grid> */}

      </React.Fragment>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pricing);
