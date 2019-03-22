import React, {Component} from 'react';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter} from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import './ChatView.css';
import { ThemeProvider, MessageList, MessageGroup, MessageText, MessageTitle, Message, AgentBar, Row, IconButton, SendIcon, CloseIcon, TextComposer, AddIcon, TextInput, SendButton, EmojiIcon } from '@livechat/ui-kit';
import { Grid } from '@material-ui/core';


const styles = theme => ({
  root: {
    // overflowY: 'scroll',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    maxWidth: 650,
    height: 130
  },
  chatViewHead: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'spaceEvenly',
    padding: '0',
    paddingLeft: '5%',
    height: '100px',
    borderBottom: '.5px lightgray solid',
  },
  chatViewHeadName: {
    fontSize: '24px',
    fontWeight: '300',
    padding: '0',
    marginBottom: '-2%',
  },
  chatViewHeadSummary: {
    fontSize: '18px',
    fontWeight: '200',
    padding: '0',
  },
  messageList: {
    marginBottom: 70,
    marginTop: 20,
    overflowY: 'scroll',
    overflowX: 'hidden',
    // maxHeight: '700px',
    flexGrow: 1,
    padding: 12,
    width: '100%',
    backgroundColor: 'white',

  },
  message: {
    marginBottom: 30
  },
  avatar: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 15,
    width: 55,
    height: 55,
  },
  messageAuthor: {
    textAlign: 'justify',
    padding: 10,
    paddingLeft: 20,
    // fontWeight: 'bold'
  },
  messageBody: {
    // marginTop: 20,
    paddingLeft: 20,
    paddingRight: 25,
    paddingBottom: 30,
    textAlign: 'justify'
  },
  inputArea: {
    height: '40px',
    marginBottom: '5%'
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

});


class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rep_uid: null,
      message: '',
      messages: [],
      is_closed: false,
      image_id: null,
      url: "",
      rep_name: "",
    };

    if(process.env.NODE_ENV === 'development') {
      this.socket = io('localhost:5000');
    } else {
      this.socket = io('https://webchatlabs10.herokuapp.com');
    }
    // this.socket = io(serverUrl);
    // this.socket = io('localhost:5000');
    //  this.socket = io('https://webchatlabs10.herokuapp.com');

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
  }


  componentDidMount() {
    console.log('ChatView CDM state: ', this.state);
    console.log('ChatView CDM props: ', this.props);

      const id = this.props.currentConvoId;  // Get convo_id from props
      const messageRequest = axios.get(`/api/chat/messages/${id}`);
      messageRequest
        .then(response => {
          this.setState({
            messages: response.data,
            rep_uid: this.props.rep_uid,
            url: this.props.url,
            rep_name: this.props.rep_name,
          }, () => {
            console.log('ChatView state after getting messages in CDM: ', this.state);
          });
        })
        .catch(error => {
          console.log(error.message);
          this.setState({
            rep_uid: this.props.rep_uid,
            url: this.props.url,
            rep_name: this.props.rep_name,
          }, () => {
            console.log('ChatView state after failed messages request in CDM: ', this.state);
          });
          //this.setState({error:error});
        });
    // Scroll to latest message whenever component mounts
    // this.scrollToBottom();
  }

    componentWillReceiveProps(newProps) {
        console.log('ChatView CWRP props: ', newProps);
        const that1 = this;

        const id = newProps.currentConvoId;  // Get convo_id from newProps
        const currentId = this.props.currentConvoId;

        const messageRequest = axios.get(`/api/chat/messages/${id}`);
        messageRequest
            .then(response => {
                console.log('get messages response in ChatView CWRP: ',response);
                const newConvoId = id;
                const currentConvoId = currentId;
                this.setState({
                    // uid: newProps.currentConvoSocket,
                    // convo_id: newProps.currentConvoId,
                    messages: response.data,
                }, () => {
                    console.log('ChatView state after getting messages in CWRP: ', that1.state);
                    console.log('newConvoId: ', newConvoId);
                    console.log('currentConvoId: ', currentConvoId);
                    if (newConvoId !== currentConvoId) {
                        console.log('newProps are different from old');
                        this.socket.on(newProps.currentConvoSocket, function(message) {
                            console.log('Incoming message:', message);
                            that1.addNewMessage(message);
                        });
                    }
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

    onSubmit = event =>{
        console.log('\ncurrentConvoSocket/uid in ChatView onSubmit: ', this.props.currentConvoSocket);

        let data = {
            socket_uid: this.props.currentConvoSocket,  // socket room
            conversation_id: this.props.currentConvoId,
            author_uid: this.props.rep_uid,
            author_name: this.props.rep_name,
            body: this.state.message,
            image_url: this.props.url,
        };
        console.log("data to emit: ", data);
        this.socket.emit('join', data);
        this.setState({ message: ""});

        event.preventDefault();
    }

    addNewMessage = (newMessage) => {
        console.log("newMessage in ChatView addNewMessage: ", newMessage);
        const newMessages = [];
        this.state.messages.forEach(message => {
            newMessages.push({...message});
        });
        newMessages.push(newMessage);
        this.setState({ messages: newMessages });
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleCloseConvo = event => {
        this.props.closeConvo();
        this.setState({ is_closed: true });
        event.preventDefault();
    }

    // scrollToBottom = () => {
    //     this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    // }


    render() {
        const currentConvoClosed = this.props.currentConvoClosed;
        const customer_name = `${this.props.customerName}`;
        const conversation_summary = `${this.props.summary}`
        const { classes } = this.props;
        return (

          <div className={classes.root}>
              <div className={classes.chatViewHead}>
                <p className={classes.chatViewHeadName}>{customer_name}</p>
                <p className={classes.chatViewHeadSummary}></p>
              </div>

               <div className={classes.messageList}>
                    {this.state.messages.map((message, index) => {
                        console.log(this.state)
                        console.log(message)
                        return (
                          <div className={classes.message} key={index}>
                            <MuiThemeProvider>
                              <Paper className={classes.paper}>
                                <Grid container wrap="nowrap" spacing={16}>
                                  <Grid item>
                                    <Avatar alt="Avatar" className={classes.avatar}
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
                                        className={classes.messageAuthor}
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
                                        className={classes.messageBody}
                                      >
                                      {message.body}
                                      </Typography>
                                    </Grid>
                                  </Grid>

                                </Grid>
                              </Paper>
                            </MuiThemeProvider>
                          </div>
                        );
                    })}
              </div>
              {currentConvoClosed ? (
                <h1>This conversation is closed.</h1>
              ) : (
                <div className={classes.inputArea}>
                {/* Scroll div */}
                {/* <div
                  style={{ float:"left", clear: "both" }}
                  ref={(el) => { this.messagesEnd = el; }
                }>
                </div>       */}
                <form className={classes.inputForm} onSubmit={this.onSubmit}>
                  <input
                    hintText="message"
                    name="message"
                    type="text"
                    value={this.state.message}
                    onChange={this.onChange}
                    style ={{
                      border: '1.5px solid lightgrey',
                      borderRadius: '3px',
                      height: '35px',
                      padding: '0',
                      width: '90vw',
                      maxWidth: '490px',
                    }}
                    className="messageInput"
                  />
                  <div style={{
                    marginLeft: '3px',
                  }}>
                    <MuiThemeProvider>
                      <RaisedButton
                        label="Send"
                        primary={true}
                        type="submit"
                      />
                      <RaisedButton
                        label="End Convo"
                        onClick={this.handleCloseConvo}
                      />
                    </MuiThemeProvider>
                  </div>
                </form>
                </div>
              )}
              
          </div>
    );
  }
}

// ChatView.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(ChatView);
export default withStyles(styles)(withRouter(ChatView));







// Underneath is old JSX


{/* <div className="chat-view">
<ThemeProvider>
<MuiThemeProvider>
  <div className="chat-view-header">
      <MessageGroup>
          <MessageTitle>Serving Customer: {customer_name}</MessageTitle>
          <MessageText>{conversation_summary}</MessageText>
      </MessageGroup>
  </div>

    <div className="messageList">
      <MessageList>
        {this.state.messages.map((message, index) => {
          console.log(message);
          if(customer_name === message.author_name) {
            return (
              <Row reverse>
                <AgentBar>
                    <img src={message.image_url} style={{ width: 55, height: 55 }}/>
                </AgentBar>

                <Message
                    authorName={message.author_name}
                    isOwn={true}
                >
                    <MessageText>
                        {message.body}
                    </MessageText>
                </Message>
              </Row>
            );
          } else {
            return (
              <Row>
                <AgentBar>
                  <img src={message.image_url} style={{ width: 55, height: 55 }}/>
                </AgentBar>
                <Message
                  authorName={message.author_name}
                >
                  <MessageText>
                    {message.body}
                  </MessageText>
                </Message>
              </Row>
            );
            }
        })}
      </MessageList>
    </div>
    <form
      className="form"
      onSubmit={this.onSubmit}
    >

      <input
          hintText="message"
          name="message"
          type="text"
          style ={{
            padding: '20px',
            border: '2px solid red',
            width: '90vw',
            padding:'0px 15px 0px 10px'
          }}
          inputStyle ={{width: '100%' }}
          className="messageInput"
          value={this.state.message}
          onChange={this.onChange}
      />

      {is_closed ? (
          <p>This conversation is closed.</p>
      ) : (
          <div className="footer-buttons">
          <RaisedButton
              label="send"
              primary={true}
              type="submit"
          />

          <RaisedButton
              label="End Conversation"
              secondary={true}
              onClick={this.handleCloseConvo}
          />
          </div>
      )}
    </form>
            <div className="rootReplacement">
                <div className="messages">
                </div>
                <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
                </div>

                <div className="footer">
                </div>
            </div>
</MuiThemeProvider>
</ThemeProvider>
</div> */}
