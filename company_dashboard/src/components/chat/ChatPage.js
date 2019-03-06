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
                this.state = {
			uid:props.history.location.state.uid,
                        message:'',
                        messages:[],
        	};

        this.socket = io('https://webchatlabs10.herokuapp.com');
	

        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
		addMessage(message);
        });


        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }
        }


        // Join conversation and send initial message
        onSubmit = event => {
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
                        summary: this.state.message
                };

                axios.post('/api/chat/newconvo', convo)
                .then(response => {
                        console.log("Conversation created.")
                })
                .catch(error => {
                        console.log(error.message);
                });

                this.setState({message:""});


                console.log('messages', this.state.messages);
                event.preventDefault();
        }

        // Send a message after joining conversation
        onSend = event => {
                let data = {};
                data.uid = this.state.uid;
                data.message = this.state.message;

                this.socket.emit('join', data);
                this.setState({ message: ""});
        }


        onChange = event => {
                this.setState({ [event.target.name]: event.target.value });
        };


	render() {
		const { classes } = this.props;
                return(
                <div>
		 <MuiThemeProvider>	
                <div className="container">
                <div className="row">
                <div className="col-12">
                <div className="card">
                <div className="card-body">
                <div className="card-title">
                </div>
                <hr/>
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
		
		<form onSubmit={this.onSubmit}>	
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
		
		<RaisedButton
              	label="send"
              	primary={true}
              	type="submit"
        	/>

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
