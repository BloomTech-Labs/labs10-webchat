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
});


class ChatRepPage extends Component {
        constructor(props) {
                super(props);
                this.state = {
                        uid:props.match.params.id,
                        message:'',
                        messages:[],
                        is_closed: false,
			image_id:null,
			url:"",
			rep_name:"",
                };

	  this.socket = io('localhost:5000');
	   //this.socket = io('https://webchatlabs10.herokuapp.com');

        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
                addMessage(message);
        });


        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }

        this.closeConvo = this.closeConvo.bind(this);
        }

componentDidMount(){
        const request = axios.get("/api/reps/alldetails");

             request.then(rep => {
                console.log('rep details', rep)
              this.setState({
                image_id: rep.data.image_id,
                url: rep.data.url,
                rep_name: rep.data.name,
                });

              })
              .catch(error => {
                console.log(error.message);
                //this.setState({error:error});
              });
        

}


onSubmit = event =>{
          console.log('room_uid inside onSubmit is', this.state.uid);
          console.log('messages array', this.state.messages);


          let data = {};
          data.uid = this.state.uid;
          data.message = this.state.message;
	  data.name = this.state.rep_name;
	  data.url = this.state.url;


          this.socket.emit('join', data);
          this.setState({message:""});


          console.log('messages', this.state.messages);
          event.preventDefault();
}

onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
};

closeConvo() {
        const customer_uid = this.state.uid;
        const data = { customer_uid: customer_uid };
        console.log("close convo data: ", data);
        axios.put('/api/chat/closefromchatreppage', data)
        .then(response => {
            console.log("Conversation closed.")
            this.setState({
                is_closed: true
            })
        })
        .catch(error => {
            console.log(error.message);
        })	
    }



        render() {
                const is_closed = this.state.is_closed;
                const { classes } = this.props;
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
                                title="Employee Chat Panel"
                                />
                                <br/>
                                <br/>

                                <div className={classes.root}>
                                <div className="messages">
                                        {this.state.messages.map((message, index) => {
                                                return(
                                                <Paper key={index} className={classes.paper}>
                                                <AgentBar>
  						<Avatar src={message.url} />
  						<Column>
    						<Title>{message.name}</Title>
    						<Subtitle>{message.message}</Subtitle>
  						</Column>
						</AgentBar>        	
						</Paper>
                                                );
                                        })}
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
                                                onClick={this.closeConvo}
                                                /><br/><br/>
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


ChatRepPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatRepPage);	
