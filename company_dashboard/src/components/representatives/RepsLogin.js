import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class RepsLogin extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    email:'',
    password:''
    }
  }
  
  render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar
            title="Login"
          />
          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            value={this.state.email}
            onChange={this.handleChange}
            />
          <br/>
            <TextField
              type="password"
              hintText="Enter your Password"
              floatingLabelText="Password"
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
        </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

const style = {
 margin: 15,
};

export default RepsLogin;