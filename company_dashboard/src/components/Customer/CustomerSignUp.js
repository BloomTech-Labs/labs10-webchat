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
	<input
	    name="email"
	    type="text"
	    value={this.state.email}
	    placeholder="Enter your email"
	    onChange={this.onChange}
	/>	    
	
	<input 
            name="password"
            type="password"
            value={this.state.password}
            placeholder="Enter your password"
            onChange={this.onChange}
        />    

 	<input
            name="password1"
            type="password"
            value={this.state.password1}
            placeholder="Re-enter your password"
            onChange={this.onChange}
        />	    
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
