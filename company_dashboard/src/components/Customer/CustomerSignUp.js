import React, { Component } from 'react';
//import { withFirebase } from "../Firebase";
//import { Link, withRouter } from "react-router-dom"
import { FirebaseContext } from '../Firebase';
//import * as ROUTES from '../../constants/routes';

const CustomerSignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <FirebaseContext.Consumer>
      {firebase => <CustomerSignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


class CustomerSignUpForm extends Component {
  constructor(props) {
    super(props);
      
     this.state = {
    	email:"",
	password:"",
	password1:"",
	error:null     
    };
	  
  }

  onSubmit = event => {
    const {email, password } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
          console.log(authUser);

	 this.setState({email:"", password:"", password1:"" });
      })
      .catch(error => {
        this.setState({ error:error });
      });

    event.preventDefault();
  };


  onChange = event => {
	this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {email, password, password1, error} = this.state; 
    const condition = password !== password1 || password1 === '' || email === '';


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
	<button disabled={condition} type="submit">Sign Up</button>   
	{error && <p>{error.message}</p>}    
      </form>
    );
  }
}

const CustomerSignUpLink = () => (
  <p>
    Don't have an accoun?
  </p>
);



export default CustomerSignUpPage;

export { CustomerSignUpForm, CustomerSignUpLink };

//const CustomerSignUpForm = withRouter(withFirebase(CustomerSignUpFormBase));
//export default CustomerSignUpPage;
//export { CustomerSignUpForm, CustomerSignUpLink };
