import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import styled from 'styled-components'
import Navigation from "../Navigation";
import axios from 'axios'
// import logo from '../images/logo.png'
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@material-ui/core'

const PaymentContainer = styled.div`
  margin: 100px auto;
  max-width: 800px;
  /* width: 70%; */
  display: flex;
  flex-direction: column;

  h1 {
    margin: 0 auto;
    margin-bottom: 60px;
    color: white;
  }
  .title-thin {
    display: none;
  }
  @media (max-width: 600px) {
    margin: 50px auto;

    .title-thin {
      display: block;
      margin: 0 auto;

      &:last-of-type {
        margin-bottom: 40px;
      }
    }
    .title-wide {
      display: none;
    }
  }

  .card {
    box-shadow: 0 0 5px 5px rgb(230, 230, 230);
    border-radius: 0;
    /* background: linear-gradient(to right, rgb(82, 157, 248), rgb(66, 126, 199)); */
  }

  .MuiCardHeader-root-262 {
    padding-bottom: 0;
  }
`

const PaymentButton = styled.div`
  margin: auto;
  margin-top 5%;
  width: 40%;
  display: flex;
  flex-direction: column;
`

const styles = theme => ({
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
})

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubscribed: false
    }
  }

  basicToken = token => {
    let bodyToSend = {
      ...token,
      subscription: {
        plan: 'plan_EXEVzE4nraOpql',   // corresponds to plan ID from Stripe Dashboard
      },
    }
    this.addSubscription(bodyToSend)
  }

  addSubscription = body => {  
    // let auth = {
    //   headers: {
    //     authorization: localStorage.getItem('access_token'),
    //   },
    // }

    // addSub endpoint will do the following:
    // - check if sub for user already exists in webchat db, if no existing sub:
    // -- create Stripe customer with stripe.customers.create
    // -- create Stripe subscription with stripe.subscription.create, using the newly created customer
    // -- insert subscription into subscriptions table in webchat db
    axios
      .post(`/api/billing/addSub`, body)  
      .then(response => {    
        console.log('Subscription created with response: ', response);
        this.setState({ isSubscribed: true });
      })
      .catch(error => {
        console.log('Error from addSub: ', error)
      })
  }

  render() {

    const subscriptionTiers = [
      {
        title: 'Basic',
        price: '30',
        description: ['5 users'],
        value: 'a',
        token: this.basicToken,   // Corresponds to token definition above
      }
    ]

    const isSubscribed = this.state.isSubscribed;

    return (
      // {this.state.isSubscribed ? (
      //   <p>Your company has a subscription</p>
      // ) : (
      <PaymentContainer>
        <h1 className="title-wide">Our Subscription Options</h1>
        <h1 className="title-thin">Our</h1>
        <h1 className="title-thin">Subscription</h1>
        <h1 className="title-thin">Options</h1>
        <Grid container spacing={40} alignItems="flex-end">
          {subscriptionTiers.map(tier => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card className="card" align="center">
                <CardHeader
                  title={tier.title}
                  // subheader={tier.subheader} no subheaders defined
                  titleTypographyProps={{ align: 'center', variant: 'h3' }}
                  subheaderTypographyProps={{ align: 'center' }}
                />
                <CardContent>
                  <div className={styles.cardPricing}>
                    <Typography
                      align="center"
                      // component="h2"
                      variant="h3"
                      color="textPrimary"
                    >
                      ${tier.price}
                    </Typography>
                    <Typography
                      align="center"
                      variant="h5"
                      color="textSecondary"
                    >
                      monthly
                    </Typography>
                  </div>
                  {tier.description.map(line => (
                    <Typography variant="h6" align="center" key={line}>
                      {line}
                    </Typography>
                  ))}
                  <PaymentButton>
                    <StripeCheckout
                      label="BUY"
                      panelLabel="SUBSCRIBE"
                      token={tier.token}
                      stripeKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu"
                      name={tier.title}
                      description={tier.description}
                      amount={tier.price * 100}
                      allowRememberMe={false}
                      // image={logo}
                    />
                  </PaymentButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </PaymentContainer>
      // )}
    )
  }
}

export default Billing;
