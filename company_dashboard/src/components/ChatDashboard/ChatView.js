import React, {Component} from 'react';
import io from 'socket.io-client';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { withRouter} from "react-router-dom"
import Typography from '@material-ui/core/Typography';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from '@material-ui/core/Paper';
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
    maxWidth: 500,
  },
  image: {
    width: 100,
    height: 100,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    borderRadius: '3px'
  },
  chatViewHead: {
    // flexShrink: 0
  },
  messageList: {
    margin: 70,
    overflowY: 'scroll',
    // maxHeight: '700px',
    flexGrow: 1,
    margin: 10

  },
  inputArea: {
    height: '40px',
    marginBottom: '20px'
  },
  inputForm: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }
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
  }


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
    // this.scrollToBottom();
  }

    componentWillReceiveProps(newProps) {
        console.log('ChatView CWRP props: ', newProps);
        const that1 = this;

        const id = newProps.currentConvoId;  // Get convo_id from props
        const currentId = this.props.currentConvoId;

        const messageRequest = axios.get(`/api/chat/messages/${id}`);
        messageRequest
            .then(response => {
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
            author_uid: this.state.rep_uid,
            author_name: this.state.rep_name,
            body: this.state.message,
            image_url: this.state.url,
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
        const is_closed = this.state.is_closed;
        const customer_name = `${this.props.customerName}`;
        const conversation_summary = `${this.props.summary}`
        const { classes } = this.props;
        return (

          <div className={classes.root}>
              <div className={classes.chatViewHead}>
                <h1>CHAT VIEW HEAD</h1>
              </div>

              <div className={classes.messageList}> 
                    {this.state.messages.map((message, index) => {
                        console.log(message.image_url)
                        return (
                          <div className={classes.message}>
                            <MuiThemeProvider>
                              <Paper className={classes.paper}
                              style={{
                                margin: '10px',

                              }}
                              >
                                <Grid 
                                 spacing={12}
                                //  alignItems="center"
                                //  justify="center"
                                 container spacing={16}
                                 >
                                  <Grid item>
                                    <ButtonBase className={classes.image}>
                                      <img
                                        className={classes.img}
                                        alt="complex"
                                        src={message.image_url}
                                      />
                                    </ButtonBase>
                                  </Grid>
                                  <Grid item xs={12} sm container>
                                    <Grid item xs container direction="column" spacing={16}>
                                      <Grid item xs>
                                        <Typography gutterBottom variant="subtitle1">
                                          {message.author_name}
                                        </Typography>
                                        <Typography color="primary" gutterBottom>
                                          {message.body}
                                        </Typography>
                                        {/* <Typography color="textSecondary">ID: 1030114</Typography> */}
                                      </Grid>
                                      {/* <Grid item>
                                        <Typography style={{ cursor: "pointer" }}>Remove</Typography>
                                      </Grid> */}
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Paper>
                            </MuiThemeProvider>
                          </div>
                        );
                    })}
              </div>
              <div className={classes.inputArea}>
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
                      height: '40px',
                      width: '90vw',
                      maxWidth: '480px', 
                    }}
                    className="messageInput"
                  />
                  <div style={{
                    marginLeft: '3px',
                  }}>
                    <div 
                    style={{
                      border: '1px solid blue',
                      width: '100px',
                      borderRadius: '3px',
                      padding: '1px',
                    }}
                    className={classes.sendMessage}> send </div>
                    <div 
                    style={{
                      border: '1px solid red',
                      width: '100px',
                      borderRadius: '3px',
                      padding: '1px',
                    }}
                    className={classes.endConvo}> close convo </div>
                  </div>
                </form>
                {/* <form>
                  <input
                    name="message"
                    type="text"
                    value={this.state.message}
                    onChange={this.onChange}
                    />
                <ThemeProvider>
                  <div className={classes.buttonArea}>
                    <Row>
                      <IconButton>
                        <SendIcon />
                      </IconButton>
                    </Row>
                    <Row>
                      <IconButton>
                        <CloseIcon />
                      </IconButton>
                    </Row>
                  </div>
                </ThemeProvider>
              </form> */}
            </div>
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