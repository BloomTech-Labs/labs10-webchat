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
            // uid: props.currentConvoSocket,
            // convo_id: props.currentConvoId,
            // uid: null,
            // convo_id: null,
            rep_uid: null,
            message: '',
            messages: [],
            is_closed: false,
            image_id: null,
            url: "",
            rep_name: "",
        };

	    this.socket = io('localhost:5000');
	    // this.socket = io('https://webchatlabs10.herokuapp.com');

        this.socket.on(this.props.currentConvoSocket, function(message) {
            console.log('Incoming message:', message);
            addMessage(message);
        });

        const addMessage = (newMessage) => {
            console.log("newMessage to add in ChatView: ", newMessage);
            const newMessages = [];
            this.state.messages.forEach(message => {
                newMessages.push({...message});
            });
            newMessages.push(newMessage);
            this.setState({ messages: newMessages });
        }
        // const addMessage = (message) => {
        //     this.props.addMessage(message);
        // }
        // const addMessage = (data) => {
        //     this.setState({messages: [...this.state.messages, data]});
        // }

    } // *** Constructor end


    componentDidMount() {
        console.log('ChatView CDM state: ', this.state);
        console.log('ChatView CDM props: ', this.props);

        // Get details on the current rep:
        const repRequest = axios.get("/api/reps/alldetails");
        repRequest.then(rep => {
            const id = this.props.currentConvoId;  // Get convo_id from props
            const messageRequest = axios.get(`/api/chat/messages/${id}`);
            messageRequest
                .then(response => {
                    this.setState({
                        messages: response.data,
                        rep_uid: rep.data.uid,
                        image_id: rep.data.image_id,
                        url: rep.data.url,
                        rep_name: rep.data.name,
                    }, () => {
                        console.log('ChatView state after getting messages in CDU: ', this.state);
                    });
                })
                .catch(error => {
                        console.log(error.message);
                        //this.setState({error:error});
                });
            // this.setState({
            //     rep_uid: rep.data.uid,
            //     image_id: rep.data.image_id,
            //     url: rep.data.url,
            //     rep_name: rep.data.name,
            // });
            })
            .catch(error => {
            console.log(error.message);
            //this.setState({error:error});
            });
        // Scroll to latest message whenever component mounts
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps) {

        const currentProps = this.props;
        // if (currentProps.currentConvoId !== prevProps.currentConvoId) {

            const id = this.props.currentConvoId;  // Get convo_id from props

            const messageRequest = axios.get(`/api/chat/messages/${id}`);
            messageRequest
                .then(response => {
                    this.setState({
                        messages: response.data,
                    }, () => {
                        console.log('ChatView state after getting messages in CDU: ', this.state);
                    });
                })
                .catch(error => {
                        console.log(error.message);
                        //this.setState({error:error});
                });
        // }
    }

    // componentWillReceiveProps(newProps) {
    //     console.log('ChatView CWRP props: ', newProps);
    //     const that1 = this;
    //     const that2 = this;   // ** might not need this

    //     const id = newProps.currentConvoId;  // Get convo_id from props

    //     const messageRequest = axios.get(`/api/chat/messages/${id}`);
    //     messageRequest
    //         .then(response => {
    //             this.setState({
    //                 uid: newProps.currentConvoSocket,
    //                 convo_id: newProps.currentConvoId,
    //                 messages: response.data,
    //             }, () => {
    //                 console.log('ChatView state after getting messages in CWRP: ', that1.state);
    //                 that1.socket.on(newProps.currentConvoSocket, function(message) {       // Initialize after updating state to make sure past messages are there before customer emits new ones
    //                     console.log('Incoming message:', message);
    //                     that2.addMessage(message);
    //                 });
    //             });
    //         })
    //         .catch(error => {
    //                 console.log(error.message);
    //                 //this.setState({error:error});
    //         });
    //     // this.setState({
    //     //     messages: newProps.messages
    //     // });
    //     // const that = this;
    //     // this.socket.on(newProps.currentConvoSocket, function(message) {
    //     //     console.log('Incoming message:', message);
    //     //     that.addMessage(message);
    //     // });
        
    // }

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

    // addMessage = (newMessage) => {
    //     console.log("newMessage in ChatView: ", newMessage);
    //     const newMessages = [];
    //     this.state.messages.forEach(message => {
    //         newMessages.push({...message});
    //     });
    //     newMessages.push(newMessage);
    //     this.setState({ messages: newMessages });
    // }

    


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
