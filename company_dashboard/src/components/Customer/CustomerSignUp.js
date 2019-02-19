import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';

const CustomerSignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <CustomerSignUpForm />
  </div>
);

class CustomerSignUpForm extends Component {
  constructor(props) {
    super(props);
      
     this.state = {
    	email:"",
	password:"",
	password1:"",     
    };
	  
  }

  onSubmit = event => {

  }

  onChange = event => {
	this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>

      </form>
    );
  }
}

const CustomerSignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.CUSTOMER_SIGN_UP}>Sign Up</Link>
  </p>
);

export default CustomerSignUpPage;

export { CustomerSignUpForm, CustomerSignUpLink };
