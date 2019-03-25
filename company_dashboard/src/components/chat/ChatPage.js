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
import './ChatPage.css';
import { ThemeProvider, AgentBar, Subtitle, Title, Column } from '@livechat/ui-kit';

const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  message: {
    marginBottom: 30
  },
  paper: {
    maxWidth: 400,
    width: 300,
//     margin: `${theme.spacing.unit}px auto`,
    margin: `auto`,
    marginLeft: 30,
    padding: theme.spacing.unit * 2,
    height: 80,
  },
  repAvatar: {
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 15,
    width: 40,
    height: 40,
  },
  repName: {
    padding: 5,
    paddingLeft: 20,
    textAlign: 'justify',
 },
  repMessage: {
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 30,
    textAlign: 'justify',
 },
  customerAvatar: {
    marginRight: 15,
    marginTop: 15,
    marginBottom: 15,
    width: 40,
    height: 40,
  },
  customerName: {
    padding: 10,
    paddingRight: 20,
    textAlign: 'justify',
  },
  customerMessage: {
    paddingRight: 20,
    paddingLeft: 25,
    paddingBottom: 30,
    textAlign: 'justify',
  }
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

                if(process.env.NODE_ENV === 'development') {
                        this.socket = io('localhost:5000');
                } else {
                        this.socket = io('https://webchatlabs10.herokuapp.com');
                }
	       //this.socket = io('localhost:5000');
        //  this.socket = io('https://webchatlabs10.herokuapp.com');

        this.socket.on(this.state.uid, function(message) {
		addMessage(message);
        });

        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }
        }

        componentDidMount(){
                const request = axios.get("/api/customers/getbyUID");

                request.then(response => {
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

                // this.scrollToBottom();
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

        // scrollToBottom = () => {
        //         this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        // }


	render() {
		const { classes } = this.props;
                return(
                <div className="customer-chat">
                <div>
                <div>
                <div>
                <div>
                <div>
                <div>
                </div>
                <div className="customer-chat-top-bar">
                  <p>Customer Support Live Chat</p>
                </div>
		<br/>
		<br/>

		<div className={classes.root}>
                <div className="messages">
                {this.state.messages.map((message, index) => {
                        console.log("== wj == Each message: ", message);
                        console.log("== wj == ChatPage state on render: ", this.state);
                        // If message's author uid (Customer or Rep) matches this.state.uid whichh is the customer's uid, we will render that message on the right side
                        if(message.author_uid === this.state.uid) {
                                return (
                                <div className={classes.message}>
                                        <MuiThemeProvider>
                                                <Paper className={[classes.paper, "customer-message"].join(' ')} key={index}>
                                                        <Grid
                                                                container
                                                                direction="row"
                                                                wrap="nowrap"
                                                                spacing={16}
                                                        >
                                                              <Grid item>
                                                                <Avatar
                                                                        alt="Avatar"
                                                                        className={classes.customerAvatar}
                                                                        src={message.image_url}
                                                                        >
                                                                </Avatar>
                                                                </Grid>

                                                                <Grid>
                                                                        <Grid
                                                                        item
                                                                        xs
                                                                        >
                                                                                <Typography
                                                                                variant="h6"
                                                                                className={classes.customerName}
                                                                                >
                                                                                {message.author_name}
                                                                                </Typography>
                                                                        </Grid>
                                                                <Grid
                                                                item
                                                                xs
                                                                >
                                                                        <Typography
                                                                        variant="componenth6"
                                                                        className={classes.customerMessage}
                                                                        >
                                                                                {message.body}
                                                                        </Typography>
                                                                </Grid>
                                                                </Grid>

                                                        </Grid>
                                                </Paper>
                                        </MuiThemeProvider>
                                </div>
                                )
                        } else {
                                return (
                                <div className={classes.message}>
                                         <MuiThemeProvider>
                                                <Paper className={[classes.paper, "rep-message"].join(' ')} key={index}>
                                                        <Grid container wrap="nowrap" spacing={16}>
                                                                <Grid item>
                                                                        <Avatar
                                                                                alt="Avatar"
                                                                                className={classes.repAvatar}
                                                                                src={message.image_url}
                                                                                >
                                                                        </Avatar>
                                                                </Grid>
                                                                <Grid>
                                                                        <Grid
                                                                        item
                                                                        xs
                                                                        >
                                                                                <Typography
                                                                                variant="h6"
                                                                                className={classes.repName}
                                                                                >
                                                                                {message.author_name}
                                                                                </Typography>
                                                                        </Grid>
                                                                <Grid
                                                                item
                                                                xs
                                                                >
                                                                        <Typography
                                                                        variant="componenth6"
                                                                        className={[classes.repMessage, "rep-message-text"].join(' ')}
                                                                        >
                                                                                {message.body}
                                                                        </Typography>
                                                                </Grid>
                                                                </Grid>

                                                        </Grid>
                                                </Paper>
                                        </MuiThemeProvider>
                                </div>
                                )
                        }
                        })}
                </div>
                {/* <div className="autoscrolldiv">
                        <div style={{ float:"left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}>
                        </div> */}
                {/* </div> */}
                <div className="footer">
		<form onSubmit={this.onSend}>
                        <MuiThemeProvider>
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
                        primary={true}
                        type="submit"
                        onSubmit={this.onStart}
                        onClick={this.onStart}
                        />
                )}
                        </MuiThemeProvider>
		</form>

                </div>
                </div>
                </div>
		</div>
                </div>
                </div>
		</div>
                </div>
                );
        }
}


ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatPage);
