import React, {Component} from 'react';
import io from 'socket.io-client';

class Chat extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			messages: []
        };
        this.socket = io('localhost:5000');

	this.sendMessage = (ev) => {
		ev.preventDefault();
		if(this.state.message) {
			this.socket.emit('SEND_MESSAGE', {
				message: this.state.message,
			});
			} 
		else alert('You are missing one of the following(s): Message');
			this.setState({message: ''});
				}

        this.socket.on('RECEIVE_MESSAGE', function(data) {
					addMessage(data);
        });

        const addMessage = (data) => {
		this.setState({messages: [...this.state.messages, data]});
        }
        
	}
	render() {
		return(
			<div>
				<div className="container">
					<div className="row">
						<div className="col-12">
							<div className="card">
								<div className="card-body">
								<div className="card-title">
									Customer Name
								</div>
								<hr/>
								<div className="messages">
								{this.state.messages.map((message, index) => {
								return(
									<div key={index}>USER : {message.message}</div>
								);
								})}
								</div>
			
			<div className="footer">
			<input type="text" placeholder="Say something" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
			<br/>

			<button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
				</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			</div>
			<div>
			<div className="container">
			<div className="row">
			<div className="col-12">
			<div className="card">
			<div className="card-body">
			<div className="card-title">
			Customer Name
			</div>
			<hr/>
			<div className="messages">
			{this.state.messages.map((message, index) => {
			return (
			<div key={index}>USER : {message.message}</div>
			);
			})}
			</div>
			<div className="footer">
		<input type="text" placeholder="Say something" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
			<br/>
	<button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
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

export default Chat;
