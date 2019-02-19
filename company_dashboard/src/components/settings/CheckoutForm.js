import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false };
    this.submit = this.submit.bind(this);
  }

  async submit(ev) {
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    console.log("Stripe token from checkout form submit: ", token);
    let company_id = 1;
    // Company ID is hardcoded in until we have user accounts set up

    // let response = await fetch("http://localhost:5000/api/billing/charge", {
    //   method: "POST",
    //   headers: { "Content-Type": "text/plain" },
    //   body: {
    //     "token": token.id,
    //     "company_id": company_id
    //   }
    // });
    let chargeRequest = { token: token.id, company_id: company_id};
    axios.post("http://localhost:5000/api/billing/charge", chargeRequest)
      .then(response => {
        console.log("charge response: ", response);
      })
      .catch(err => {
        console.log(err);
      })


    // if (response.ok) this.setState({ complete: true });
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;
    return (
      <div className="checkout">
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Send</button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
