import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/routes";
import classNames from 'classnames';
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
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },
  logo: {
    width: 80,
    height: 60,
    display: 'flex',
  },
  netlify: {
    width: 70,
    height: 70,
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
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
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
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

const tiers = [
  {
    title: 'Regular',
    price: '30',
    description: ['Unlimited users included', 'Help center access', '24/7 live chat'],
    buttonText: 'Get Started',
    buttonVariant: 'contained',
  },
];


class Billing extends Component {

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
                  src={require("../images/logo.png")}
                  alt="logo"
                />
              </Link>
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
              src={require("../images/logomark.png")}
              alt="Netlify logo"
            />
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
              <Grid item key={tier.title} xs={12} sm={tier.title === 'Regular' ? 12 : 6} md={4}>
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: 'center' }}
                    subheaderTypographyProps={{ align: 'center' }}
                    action={tier.title === 'Regular' ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography component="h2" variant="h3" color="textPrimary">
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="textSecondary">
                        for lifetime
                      </Typography>
                    </div>
                    {tier.description.map(line => (
                      <Typography variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions className={classes.cardActions}>
                    <Button fullWidth variant={tier.buttonVariant} color="primary">
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </main>
        <StripeProvider apiKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu">
          <Elements>
            <CheckoutForm />
          </Elements>
       </StripeProvider>
      </React.Fragment>
    );
  }
}

Billing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Billing);



// import React, { Component } from "react";
// import { Elements, StripeProvider } from "react-stripe-elements";
// import CheckoutForm from "./CheckoutForm";

// class Billing extends Component {
//   render() {
//     return (
//       <StripeProvider apiKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu">
//         <div className="example">
//           <h1>Lifetime purchase of webchat for $30</h1>
//           <Elements>
//             <CheckoutForm />
//           </Elements>
//         </div>
//       </StripeProvider>
//     );
//   }
// }

// export default Billing;
