import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class RepsLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    email:"",
    password:"",
    error:"",	    
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
	const {email, password, error} = this.state;

        //checking if all the required fields are non-empty  
        const condition = password !== password1 || password1 === '' || email === '';

    return (
	<div>
       	 <MuiThemeProvider>
        	{this.state.logged ? (<Typography variant='display1' align='center' gutterBottom>
        	Successfully Logged In
        	</Typography>):(
       	<div>
       	<AppBar
            title="Sign Up"
       	/>
	  <form onSubmit={this.onSubmit}>  
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
	    required={true}
            value={this.state.email}
            onChange={this.handleChange}
            />
          <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
	      required={true}
              value={this.state.password}
              onChange={this.handleChange}
              />
            <br/>
            <RaisedButton 
              label="Login" 
              primary={true} 
              style={style} 
              onClick={this.login}
            />

      //if there is an error while registering, it will be displayed on the page              
        {error && <p>{error.message}</p>}
      </form>
      </div>)}
   </MuiThemeProvider>
</div>);
  }
}

const style = {
 margin: 15,
};

export default RepsLogin;
