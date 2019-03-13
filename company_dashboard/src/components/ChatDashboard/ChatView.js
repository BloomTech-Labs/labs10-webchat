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
    height: 500,
    overflowY: 'scroll'
  }
});


class ChatView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: props.currentConvoSocket,
            // convo_id: null,
            rep_uid: null,
            message: '',
            // messages: props.messages,
            is_closed: false,
			image_id: null,
			url: "",
			rep_name: "",
        };
        
	    this.socket = io('localhost:5000');
	    // this.socket = io('https://webchatlabs10.herokuapp.com');

        this.socket.on(this.state.uid, function(message) {
            console.log('Incoming message:', message);
            // props.addMessage(message);
        });

        // const addMessage = (message) => {
        //     this.props.addMessage(message);
        // }
        // const addMessage = (data) => {
        //     this.setState({messages: [...this.state.messages, data]});
        // }
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
        console.log('ChatView props.messages before emit: ', this.props.messages);

        // let data = {
        //     socket_uid: this.state.uid,  // socket room
        //     conversation_id: this.state.convo_id,
        //     author_uid: this.state.rep_uid,
        //     author_name: this.state.rep_name,
        //     body: this.state.message,
        //     image_url: this.state.url,
        // };
        let data = {
            socket_uid: this.props.socket_uid,  // socket room
            conversation_id: this.props.currentConvoId,
            author_uid: this.state.rep_uid,
            author_name: this.state.rep_name,
            body: this.state.message,
            image_url: this.state.url,
        };

        this.socket.emit('join', data);
        this.setState({ message: ""});

        console.log('ChatView props.messages after emit: ', this.props.messages);
        event.preventDefault();
    }

    componentWillReceiveProps(newProps) {
        // this.setState({ messages: [...this.state.messages, newProps.messages] });
        // this.setState({ messages: newProps.messages });
        console.log('ChatView CWRP props: ', newProps);
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
        const title = `Chat with ${this.props.customerName}`;
        return(
            
        <div>
            <ThemeProvider>
            <MuiThemeProvider>
                <div>
                <div>
                    <div>
                    <div>
                        <div>
                        <div>
                        </div>
                        <AppBar
                        title={title}
                        />
                        <br/>
                        <br/>

                        <div className={classes.root}>
                            <div className="messages">
                            {this.props.messages.map((message, index) => {
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
                            <div style={{ float:"left", clear: "both" }}
                            ref={(el) => { this.messagesEnd = el; }}>
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
                        </div>
                    </div>
                    </div>
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
