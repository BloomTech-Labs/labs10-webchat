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


const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: `0 ${theme.spacing.unit * 3}px`,
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing.unit}px auto`,
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
                        is_closed: false
                };

        //this.socket = io();
	  this.socket = io('localhost:5000');


        this.socket.on(this.state.uid, function(message) {
                console.log('Incoming message:', message);
                addMessage(message);
        });


        const addMessage = (data) => {
                this.setState({messages: [...this.state.messages, data]});
        }

        this.closeConvo = this.closeConvo.bind(this);
        }

onSubmit = event =>{
          console.log('room_uid inside onSubmit is', this.state.uid);
          console.log('messages array', this.state.messages);


          let data = {};
          data.uid = this.state.uid;
          data.message = this.state.message;


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
        // this.props.history.push({
        //         pathname: '/adminsettings',
        // });		
    }



        render() {
                const is_closed = this.state.is_closed;
                const { classes } = this.props;
                return(
                        <div>
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
                                                        <Grid container wrap="nowrap" spacing={16}>
                                                        <Grid item>
                                                        <Avatar>R</Avatar>
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                        <Typography color='inherit' variant='h4' align='center' noWrap key={index}>{message}</Typography>
                                                        </Grid>
                                                        </Grid>
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

                                        <RaisedButton
                                                label="send"
                                                primary={true}
                                                type="submit"
                                        />
                                </form>
                                {is_closed ? (
                                        <p>This conversation is closed.</p>
                                ) : (
                                        <RaisedButton
                                        label="End Conversation"
                                        secondary={true}
                                        onClick={this.closeConvo}
                                        />
                                )}
                                
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </div>
                        </MuiThemeProvider>
                        </div>
                );
        }
}


ChatRepPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChatRepPage);	
