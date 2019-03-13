import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import "./Billing.css";
import Navigation from "../Navigation";

class Billing extends Component {
  render() {
    return (
      <div className="billing-container">
        <Navigation />
        <StripeProvider apiKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu">
          <div className="example">
            <h1>Lifetime purchase of webchat for $30</h1>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
