import React from 'react';
import { withFirebase } from "../Firebase";
import { Link, withRouter } from "react-router-dom"
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
            status: ""
        }
    }
    componentDidMount() {
      //const request = axios.get(`/api/reps/getbyUID`);

      //using allDetails endpoint instead of getbyUID since image_url wasn't present in getByUID endpoint, allDetails endpoints uses innerJoin to get all the rep details as well as image_url, instead of making 2 different axios calls, one for image and one for reps

      const request = axios.get("/api/reps/alldetails");

      request.then(response => {
        console.log("Account Settings CDM getByUID response: ", response);
        // console.log(response.data);

        this.setState({
          email: response.data.email,
         });
      })
      .catch(err => {
        console.log(err.message);
        this.setState({ error: err });
      })
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { email, oldPassword, newPassword1 } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, oldPassword)
            .then(signInResponse => {
                console.log('Sign in response: ', signInResponse);
                this.props.firebase.doPasswordUpdate(newPassword1)
                .then(updateResponse => {
                    console.log("Update response: ", updateResponse);
                    this.setState({
                        oldPassword: "",
                        newPassword1: "",
                        newPassword2: "",
                        status: "Your password was updated."
                    });
                })
                .catch(error => {   // if updatePassword throws error
                    console.log(error.message);
                    this.setState({
                        error: error
                    });
                })
            })
            .catch(error => {      // if signIn throws error
                console.log(error.message);
                this.setState({
                    error: error
                });
            })
        event.preventDefault();
    };

    render() {
        const { email, oldPassword, newPassword1, newPassword2, error } = this.state;

        const condition = oldPassword === '' || oldPassword === newPassword1 || newPassword1 === '' ||  newPassword1 !== newPassword2;
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                    <br/>
                    <div>{this.state.status}</div>
                    <form onSubmit={this.onSubmit}>

                        <TextField
                            hintText="Old password"
                            floatingLabelText="Old Password"
                            name="oldPassword"
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
                </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

const UpdatePasswordForm = withRouter(withFirebase(UpdatePasswordFormBase));

export default UpdatePasswordPage;

export { UpdatePasswordForm };
