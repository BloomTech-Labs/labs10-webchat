import React, {Component} from 'react';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';



const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing.unit}px auto`,
    padding: theme.spacing.unit * 2,
  },
});


class ChatRepPage extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        uid:props.history.location.state.uid,
                        message:'',
                        messages:[],
                };

        this.socket = io('localhost:5000');


        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
                addMessage(message);
        });


        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }
        }
