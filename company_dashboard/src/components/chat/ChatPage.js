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
import axios from 'axios';

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

class ChatPage extends Component {
        constructor(props) {
                super(props);
                console.log("props after super: ", props);
                this.state = {
                        uid: props.history.location.state.uid,
                        company_id: props.history.location.state.company_id,
                        message: '',
                        messages: [],
                        started: false
        	};

        //this.socket = io();
	  this.socket = io('localhost:5000');

        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
		addMessage(message);
        });
        // this.socket.on('newMessage', function(message) {
        //         console.log('Incoming message:', message);
	// 	addMessage(message);
        // });


        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }
        }


        // Join conversation and send initial message
        onStart = event => {
                console.log('room_uid inside onSubmit is', this.state.uid);
                console.log('messages array', this.state.messages);

                //var newArr = this.state.messages.slice();
                //newArr.push(this.state.message);

                let data = {};
                data.uid = this.state.uid;
                data.message = this.state.message;

                this.socket.emit('join', data);

                let convo = {
                        customer_uid: this.state.uid,
                        summary: this.state.message,
                        company_id: this.state.company_id
                };
                console.log("new convo: ", convo);
                axios.post('/api/chat/newconvo', convo)
                .then(response => {
                        console.log("Conversation created.")
                        this.setState({
                                started: true
                        })
                })
                .catch(error => {
                        console.log(error.message);
                });

                this.setState({message:""});

                console.log('Messages after Customer onSubmit', this.state.messages);
                event.preventDefault();
        }

        // Send a message after joining conversation
        onSend = event => {
                let data = {};
                data.uid = this.state.uid;
                data.message = this.state.message;

                this.socket.emit('join', data);
                this.setState({ message: ""});
                event.preventDefault();
        }


        onChange = event => {
                this.setState({ [event.target.name]: event.target.value });
        };


	render() {
                console.log("ChatPage state on render: ", this.state);
		const { classes } = this.props;
                return(
                <div>
		<MuiThemeProvider>	
                <div>
                <div>
                <div>
                <div>
                <div>
                <div>
                </div>
		<AppBar 
                title="Customer Chat Panel"
                />
		<br/>
		<br/>
		
		<div className={classes.root}>
                <div className="messages">
                {this.state.messages.map((message, index) => {
                return(
		<Paper key={index} className={classes.paper}>
                <Grid container wrap="nowrap" spacing={16}>
                <Grid item>
                <Avatar>C</Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography color='inherit' variant='h4' align='center' noWrap key={index}>{message}</Typography>
		</Grid>
                </Grid>
                </Paper>
                );
		})}
                </div>
                <div className="footer">
		
		<form onSubmit={this.onSend}>	
               	<br/>
		<br/>
                <br/>
		<TextField
            	hintText="message"
            	name="message"
            	type="text"
            	value={this.state.message}
            	onChange={this.onChange}
           	/>
          	<br/>
		{this.state.started ? (
                        <RaisedButton
                        label="send"
                        primary={true}
                        type="submit"
                        />
                ) : (
                        <RaisedButton
                        label="Start a conversation"
                        secondary={true}
                        onClick={this.onStart}
                        />
                )}
		

		</form>
                </div>
                </div>
                </div>
		</div>
                </div>
                </div>
		</div>	
		</MuiThemeProvider>	
                </div>
                );
        }
}


ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
