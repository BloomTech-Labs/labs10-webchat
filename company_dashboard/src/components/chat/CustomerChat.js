import React from 'react';
import CustomerMessage from './CustomerMessage';
import './CustomerChat.css'

const image = 'http://www.bradfordwhite.com/sites/default/files/images/corporate_imgs/iStock_000012107870XSmall.jpg';


class CustomerChat extends React.Component {
  state = {
    messages: [
      {
        type: 1,
        image,
        text: 'John\'s chat text goes here'
      },
      {
        type: 0,
        text: 'User chat text goes here'
      },
      {
        type: 1,
        image,
        text: 'John\'s chat text goes here'
      },
    ],
  };

  handleNewMessage = text => 
    this.setState({
      messages: this.state.messages.concat([{
        text,
        type: 1,
        image,
      }])
    });

  render() {
    return (
      <CustomerMessage
        messages={this.state.messages}
        onNewMessage={this.handleNewMessage}
      />
    );
  }
};

export default CustomerChat;
