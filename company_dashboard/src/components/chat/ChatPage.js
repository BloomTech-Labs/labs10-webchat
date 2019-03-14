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
import { ThemeProvider, AgentBar, Subtitle, Title, Column } from '@livechat/ui-kit';

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
                        uid: props.history.location.state.uid,
                        company_id: props.history.location.state.company_id,
                        convo_id: null,
			name: "",
                        url:"https://res.cloudinary.com/dvgfmipda/image/upload/v1551906652/zmqjmzk60yjbwgieun4i.png",
			message: '',
                        messages: [],
                        started: false
        	};

	//        this.socket = io('localhost:5000');
         this.socket = io('https://webchatlabs10.herokuapp.com');

        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
		addMessage(message);
        });

        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }
        }

        componentDidMount(){
                const request = axios.get("/api/customers/getbyUID");

                request.then(response => {
                        console.log('customer details', response);
                        this.setState({
                                name: response.data.name
                        });
                })
                .catch(error => {
                        console.log(error.message);
                        //this.setState({error:error});
                });
        }

        componentDidUpdate() {
                // console.log('ChatView CDU props: ', this.props);

                this.scrollToBottom();
        }

        // Join conversation and send initial message:
        onStart = event => {
                console.log('room_uid inside onSubmit is', this.state.uid);
                console.log('messages array', this.state.messages);

                // Add new convo to db
                let convo = {
                        customer_uid: this.state.uid,
                        summary: this.state.message,
                        company_id: this.state.company_id
                };

                axios.post('/api/chat/newconvo', convo)
                .then(response => {
                        console.log("response from POST to /newconvo (convo id):", response)
                        let messageBody = convo.summary;
                        this.setState({
                                started: true,
                                convo_id: response.data,
                                message: ""
                        }, () => {
                                let data = {
                                        socket_uid: this.state.uid,
                                        conversation_id: this.state.convo_id,
                                        author_uid: this.state.uid,     // customer uid same as socket uid
                                        author_name: this.state.name,
                                        image_url: this.state.url,
                                        body: messageBody,
                                };

                                this.socket.emit('join', data);
                        });
                })
                .catch(error => {
                        console.log(error.message);
                });

                console.log('Messages after Customer onStart', this.state.messages);

                // this.setState({message: ""});
                event.preventDefault();
        }

        // Send a message after joining conversation:
        onSend = event => {
                let data = {
                        socket_uid: this.state.uid,
                        conversation_id: this.state.convo_id,
                        author_uid: this.state.uid,   // customer uid same as socket uid
                        author_name: this.state.name,
                        image_url: this.state.url,
                        body: this.state.message,
                };

                this.socket.emit('join', data);
                this.setState({ message: ""});
                event.preventDefault();
        }


        onChange = event => {
                this.setState({ [event.target.name]: event.target.value });
        };

        scrollToBottom = () => {
                this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }


	render() {
                console.log("ChatPage state on render: ", this.state);
		const { classes } = this.props;
                return(
                <div>
		<MuiThemeProvider>
		<ThemeProvider>
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
                <AgentBar>
                <Avatar src={message.image_url} />
                <Column>
                <Title>{message.author_name}</Title>
                <Subtitle>{message.body}</Subtitle>
                </Column>
                </AgentBar>

		</Paper>
                );
		})}
                </div>
                <div className="autoscrolldiv">
                        <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                        </div>
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
                        onSubmit={this.onSend}
                        onClick={this.onSend}
                        />
                ) : (
                        <RaisedButton
                        label="Start a conversation"
                        secondary={true}
                        type="submit"
                        onSubmit={this.onStart}
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
		</ThemeProvider>
		</MuiThemeProvider>
                </div>
                );
        }
}


ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
