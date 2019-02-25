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

  componentDidMount() {
  //   this.props.firebase.auth.currentUser
  //     .getIdToken()
  //     .then(idToken => {
  //       console.log('idToken in checkoutForm: ', idToken);
  //     })
  //     .catch(err => {
  //       console.log(err.message);
  //     });
    
    const uid = localStorage.getItem('uid');
    const data = {
      uid: uid
    }
    console.log('getByUid request data: ', data);
    const idToken = localStorage.getItem('idToken');
    axios.defaults.headers.common['Authorization'] = idToken;
	  const request = axios.get(`/api/reps/getbyUID`, data);

      request.then(response => {
		    console.log(response);
        console.log(response.data);
		    console.log('company id is: ', response.data.compay_id);

        this.setState({ 
          company_id: response.data.company_id, 
        });
		
	    })
      .catch(err => {
        console.log(err.message);
        this.setState({error:err});
      })

}

  async submit(ev) {
    let { token } = await this.props.stripe.createToken();
    console.log("Stripe token from checkout form submit: ", token);
    let company_id = 1;
    // Company ID is hardcoded in until we have user accounts set up
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
        <p>Would you like to complete this purchase?</p>
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
