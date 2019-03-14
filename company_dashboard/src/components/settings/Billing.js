import React, { Component } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CheckoutForm from "./CheckoutForm";
import "./Billing.css";
import Navigation from "../Navigation";
import Paper from "@material-ui/core/Paper";

class Billing extends Component {
  render() {

    return (
      <div className="billing-container">
        <Navigation />
        <div className="billing">
          <StripeProvider apiKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu">
            <div className="example">
              <h1>Billing</h1>
              <p>Chattr is the new way to chat with your customers!</p>
              <p>$30.00 for a lifetime access includes:</p>
              <ul>
                <li>Unlimited representatives</li>
                <li>Chat Dashboard access</li>
                <li>24/7 live chat</li>

              </ul>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        </div>
      </div>
    );
  }
}

export default Billing;
