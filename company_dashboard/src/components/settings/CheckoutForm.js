import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import Button from "@material-ui/core/Button";

import "./AccountSettings.css";

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken();
    console.log("Stripe token from checkout form submit: ", token);
    let company_id = 1;
    // Company ID is hardcoded in until we have user accounts set up
    const url = `${process.env.REACT_APP_BACKEND_URL}billing/charge/`;
    let chargeRequest = { token: token.id, company_id: company_id };
    axios
      .post(`${url}`, chargeRequest)
      .then(response => {
        console.log("charge response: ", response);
        this.setState({ complete: true });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <Button
          onClick={this.submit}
          variant="contained"
          size="medium"
          color="primary"
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
