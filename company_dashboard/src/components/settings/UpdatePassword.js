import React from 'react';
import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const UpdatePasswordPage = () => (
    <div>
      <FirebaseContext.Consumer>
        {firebase => <UpdatePasswordForm firebase={firebase} />}
      </FirebaseContext.Consumer>
    </div>
  );

class UpdatePasswordFormBase extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: "",
            oldPassword: "",
            newPassword1: "",
            newPassword2: "",
            error: null,	    
        }
      }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { email, oldPassword, newPassword1 } = this.state;
        this.props.firebase
            .doPasswordUpdate(email, oldPassword, newPassword1)
            .then(response => {
                console.log(response);
                this.setState({
                    email: "",
                    oldPassword: "",
                    newPassword1: "",
                    newPassword2: ""
                });
            })
            .catch(error => {
                console.log(error.message);
                this.setState({
                    error: error
                });
            })
    };

    render() {
        const {oldPassword, newPassword1, newPassword2, error} = this.state;
        
        const condition = email === '' || oldPassword === '' || oldPassword === newPassword1 || newPassword1 === '' ||  newPassword1 !== newPassword2;
        return (
            <div>
                <MuiThemeProvider>
                    <AppBar
                        title="Update Password"
                    />
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            hintText="Old password"
                            floatingLabelText="Old Password"
                            name="old_password"
                            type="password"
                            required={true}
                            value={this.state.oldPassword}
                            onChange={this.onChange}
                        />
                        <br/>

                        <TextField
                            hintText="New password"
                            floatingLabelText="New password"
                            required={true}
                            name="newPassword1"
                            type="password"
                            value={this.state.newPassword1}
                            onChange={this.onChange}
                        />
                        <br/>

                        <TextField
                            hintText="Confirm new password"
                            floatingLabelText="Confirm new password"
                            required={true}
                            name="newPassword2"
                            type="password"
                            value={this.state.newPassword2}
                            onChange={this.onChange}
                        />
                        <br/>
                        <RaisedButton
                            label="Update"
                            primary={true}
                            type="submit"
                            disabled={condition}
                        />
                        {error && <p>{error.message}</p>}
                    </form>
                </MuiThemeProvider>
            </div>
        )
    }
}

const UpdatePasswordForm = withRouter(withFirebase(UpdatePasswordFormBase));

export default UpdatePasswordPage;

export { UpdatePasswordForm };