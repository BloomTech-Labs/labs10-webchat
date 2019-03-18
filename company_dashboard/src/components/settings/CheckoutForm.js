import React, { Component } from "react";
import { CardElement, injectStripe } from "react-stripe-elements";
import axios from "axios";
import Button from "@material-ui/core/Button";

import "./AccountSettings.css";


class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = { complete: false,
                   company_id: null,
                   open: false,
                 };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    const request = axios.get(`/api/reps/getbyUID`);

    request.then(response => {
      console.log(response);
      console.log(response.data);

      this.setState({ company_id: response.data.company_id });
    })
    .catch(err => {
      console.log(err.message);
      this.setState({ error: err });
    })
  }



  async submit(ev) {
    let { token } = await this.props.stripe.createToken();
    console.log("Stripe token from checkout form submit: ", token);
    let company_id = this.state.company_id;
    let chargeRequest = { token: token.id, company_id: company_id };
    axios
      .post("/api/billing/charge", chargeRequest)
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


