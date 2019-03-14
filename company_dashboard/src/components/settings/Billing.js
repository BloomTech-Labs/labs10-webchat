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
        {/* <Paper className="paper">
          <div className="example">
            <StripeProvider apiKey="pk_test_rY8prrYy1Hij91qrNdI5zpYu">
                <h1>Billing Records</h1>
                <Elements>
                  <CheckoutForm />
                </Elements>
            </StripeProvider>
          </div>
        </Paper> */}
      </div>
    );
  }
}

export default Billing;
