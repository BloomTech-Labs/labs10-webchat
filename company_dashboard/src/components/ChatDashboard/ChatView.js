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
import './ChatView.css';
import { ThemeProvider, AgentBar, Subtitle, Title, Column } from '@livechat/ui-kit';


const styles = theme => ({
 avatar: {
    margin: 10,
  },
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing.unit*2}px auto`,
    padding: theme.spacing.unit * 2,
  },
  root: {
    height: 700,
    overflowY: 'scroll'
  }
});


class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.currentConvoSocket,
            convo_id: props.currentConvoId,
            rep_uid: null,
            message: '',
            messages: props.messages,
            is_closed: false,
			      image_id: null,
			      url: "",
			      rep_name: "",
        };

	    this.socket = io('localhost:5000');
	    //this.socket = io('https://webchatlabs10.herokuapp.com');

        // this.socket.on(this.props.currentConvoSocket, function(message) {
        //     console.log('Incoming message:', message);
        //     addMessage(message);
        // });

        // const addMessage = newMessage => {
        //     console.log("newMessage in ChatView: ", newMessage);
        //     const newMessages = [];
        //     this.state.messages.forEach(message => {
        //         newMessages.push({...message});
        //     });
        //     newMessages.push(newMessage);
        //     this.setState({ messages: newMessages });
        // }
        // const addMessage = (message) => {
        //     this.props.addMessage(message);
        // }
        // const addMessage = (data) => {
        //     this.setState({messages: [...this.state.messages, data]});
        // }

        this.addMessage = this.addMessage.bind(this);
    } // *** Constructor end


    componentDidMount() {

        // Get details on the current rep:
        const repRequest = axios.get("/api/reps/alldetails");
        repRequest.then(rep => {
        // console.log('rep details', rep)
        this.setState({
            rep_uid: rep.data.uid,
            image_id: rep.data.image_id,
            url: rep.data.url,
            rep_name: rep.data.name,
        });
        })
        .catch(error => {
        console.log(error.message);
        //this.setState({error:error});
        });

        // Scroll to message whenever component mounts
        this.scrollToBottom();
    }

    componentDidUpdate() {
        // console.log('ChatView CDU props: ', this.props);
        this.scrollToBottom();
    }

    onSubmit = event =>{
        console.log('\ncurrentConvoSocket/uid in ChatView onSubmit: ', this.props.currentConvoSocket);
        // console.log('currentConvoSocket type: ', typeof this.props.currentConvoSocket);
        // console.log('ChatView props.messages before emit: ', this.props.messages);

        let data = {
            socket_uid: this.props.currentConvoSocket,  // socket room
            conversation_id: this.props.currentConvoId,
            author_uid: this.state.rep_uid,
            author_name: this.state.rep_name,
            body: this.state.message,
            image_url: this.state.url,
        };
        console.log("data to emit: ", data);
        this.socket.emit('join', data);
        this.setState({ message: ""});

        // console.log('ChatView props.messages after emit: ', this.props.messages);
        event.preventDefault();
    }

    addMessage = (newMessage) => {
        console.log("newMessage in ChatView: ", newMessage);
        const newMessages = [];
        this.state.messages.forEach(message => {
            newMessages.push({...message});
        });
        newMessages.push(newMessage);
        this.setState({ messages: newMessages });
    }

    componentWillReceiveProps(newProps) {
        // this.setState({ messages: [...this.state.messages, newProps.messages] });
        // this.setState({ messages: newProps.messages });
        console.log('ChatView CWRP props: ', newProps);
        if (newProps.messages !== this.props.messages) {
        this.setState({
            messages: newProps.messages
        });
        const that = this;
        this.socket.on(newProps.currentConvoSocket, function(message) {
            console.log('Incoming message:', message);
            that.addMessage(message);
        });
        }
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }


    render() {
        const is_closed = this.state.is_closed;
        const { classes } = this.props;
        const customer_name = `${this.props.customerName}`;
        const conversation_summary = `${this.props.summary}`
        return(

        <div className="chat-view">
            <ThemeProvider>
            <MuiThemeProvider>
                        <div className="chat-view-header">
                          <p>Chat with {customer_name}</p>
                          <p>{conversation_summary}</p>
                        </div>
                        <br/>
                        <br/>

                        <div className={classes.root}>
                            <div className="messages">
                            {this.state.messages.map((message, index) => {
                                return(
                                <div key={index} className="message">
                                    <AgentBar>
                                    <img src={message.image_url} />
                                    <div className="message-info">
                                        <Title>{message.author_name}</Title>
                                        <Subtitle>{message.body}</Subtitle>
                                    </div>
                                    </AgentBar>
                                </div>
                                );
                            })}
                            </div>
                            <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
                            </div>

                            <div className="footer">
                            <form 
                            className={classes.form}
                            onSubmit={this.onSubmit}>
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
                                <br/>
                                <RaisedButton
                                label="send"
                                primary={true}
                                type="submit"
                                />
                                {is_closed ? (
                                <p>This conversation is closed.</p>
                                ) : (
                                <div>
                                <br/>
                                <RaisedButton
                                label="End Conversation"
                                error={true}
                                onClick={this.props.closeConvo}
                                />
                                <br/>
                                <br/>
                                </div>
                                )}
                            </form>
                            </div>
                        </div>
            </MuiThemeProvider>
            </ThemeProvider>
        </div>
    );
  }
}

ChatView.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatView);
