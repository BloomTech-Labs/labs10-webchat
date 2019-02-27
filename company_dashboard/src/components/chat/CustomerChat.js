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
      message:"",	    
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


              this.socket.on('connect', function(data) {

                     //this.socket.emit('join', this.props.history.location.state.uid);
           	});

          this.socket.on(this.state.uid, function(data) {
                console.log('Incoming message:', data);
            });
	  
  }



  componentDidMount() {
    //this.scrollToBot();
	  //
	   console.log('room_uid inside onSubmit is', this.state.uid);
  }

  componentDidUpdate() {
    this.scrollToBot();
  }

  scrollToBot() {
    ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
  }


onSubmit = event =>{
	console.log('room_uid inside onSubmit is', this.state.uid);
	let data = {};
	  data.uid = this.state.uid;
	  data.message = this.state.message;

	 //this.socket.on('connect', function(data) {
                      
		 this.socket.emit('join', data);
		 this.setState({message:""});
        // });
	event.preventDefault();
}

  onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
  };

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
        <form className='input' onSubmit={this.onSubmit}>
          <input 
	    type="text"
	    name="message"
	    onChange={this.onChange}
	    value={this.state.message} />
	    <button type="submit">send</button>
        </form>
      </div>
    );
  }
};

export default CustomerChat;
