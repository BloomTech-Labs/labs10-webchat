import React from 'react';
import ReactDOM from 'react-dom';
import CustomerMessage from './CustomerMessage';
import io from 'socket.io-client';

class CustomerChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid:props.history.location.state.uid,	    
      name:"",
      motto:"",
      image_id:"",
      rate: null,
      chats: [
        {
          username: 'John Agent',
          content: <p>John's chat text goes here</p>
        },
        {
          username: 'User',
          content: <p>User chat text goes here</p>
        },
        {
          username: 'John Agent',
          content: <p>John's chat text goes here</p>
        },
      ]
    };

    this.submitMessage = this.submitMessage.bind(this);


    this.socket = io('localhost:5000');     


    // set-up a connection between the client and the server

    this.socket.on('connect', function() {
      // Connected, to the server, join a room to chat with a representative
      this.socket.emit('join', props.history.location.state.uid);
    });

    // this.socket.on('message', function(data) {
      // console.log('Incoming message:', data);
    // });
	}



  componentDidMount() {
    this.scrollToBot();
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
  }

  submitMessage(e) {
    e.preventDefault();

    this.setState({
      chats: this.state.chats.concat([{
          username: 'John Agent',
          content: <p>{ReactDOM.findDOMNode(this.refs.msg).value}</p>
      }])
    }, () => {
      ReactDOM.findDOMNode(this.refs.msg).value = '';
    });
}
  render() {
    const username = 'John Agent';
    const { chats } = this.state;

    return (
      <div className='chatroom'>
        {this.state.repName}
        <br/>
        {this.state.repMotto}
        <ul className='chats' ref='chats'>
          {
            chats.map((chat) => 
              <CustomerMessage chat={chat} user={username} />
            )
          }
        </ul>
        <form className='input' onSubmit={(event) => this.submitMessage(event)}>
          <input type='text' ref='msg' />
          <input type='submit' value='submit' />
        </form>
      </div>
    );
  }
};

export default CustomerChat;
