import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class CustomerMessage extends React.Component {
  state = {
    newMessage: '',
  }

  getConversations(messages) {
    if (messages === undefined) {
      return;
    }

    const listItems = messages.map((message, index) => {
      let bubbleClass = 'customer';
      let bubbleDirection = '';

      if (message.type === 0) {
        bubbleClass = 'admin';
        bubbleDirection = 'bubble-direction-reverse';
      }
      return (
        <div className={`bubble-container ${bubbleDirection}`} key={index}>
          <img className={`img-circle`} src={message.image} />
          <div className={`bubble ${bubbleClass}`}>{message.text}</div>
        </div>
      );
    });
    return listItems;
  }

  handleSubmit = event => {
    event.preventDefault()

    const {props: {onNewMessage}, state: {newMessage}} = this

    if (onNewMessage && newMessage) {
      onNewMessage(newMessage)
    }
    this.setState({
      newMessage: '',
    })
  }

  handleInputChange = event => this.setState({
    newMessage: event.target.value,
  })
  
  render() {
    const {props: {messages}, state: {newMessage}} = this;
    const chatList = this.getConversations(messages);
    const { classes } = this.props;

    return (
      <div className='chats'>
        <div className='chat-box'>
          <div className='chat-list'>
            {chatList}
          </div>
          <form
            className='new-message'
            onSubmit={this.handleSubmit}
          >
            <input
              className='new-message-input'
              placeholder='Say something...'
              value={newMessage}
              onChange={this.handleInputChange}
            />
          </form>
        </div>
        
        <Button 
          variant="outlined" 
          color='secondary'
          className={classes.button}
        >
          End Chat
        </Button>
        <Button 
          variant="outlined" 
          color='primary'
          className={classes.button}
        >
          Send
        </Button>
      </div>
    );
  }
}

CustomerMessage.propTypes = {
  messages: PropTypes.array.isRequired,
  onNewMessage: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CustomerMessage);
