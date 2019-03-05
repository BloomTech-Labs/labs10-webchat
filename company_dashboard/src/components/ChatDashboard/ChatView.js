// This component is displayed on the right side of ChatDashboard
// It shows the signed-in rep's current conversation
// Props: receives currentConvoId from chatDashboard
//        receives currentConvoSocket from chatDashboard

import React from 'react';
import axios from 'axios';
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


class ChatView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: this.props.currentConvoSocket,
            currentConvoId: this.props.currentConvoId,
            message: '',
            messages: []
        };
        
        this.socket = io('http://localhost:5000');
        const room = 
        this.socket.on(this.state.uid, function(message) {
            console.log('ChatView incoming message: ', message);
            addMessage(message);
        });

        const addMessage = (data) => {
            this.setState({ 
                messages: [...this.state.messages, data]
            });
        }  
    }

    
    onSubmit = event => {
        console.log('socket room (uid) inside onSubmit is', this.props.currentConvoSocket);
        console.log('messages array', this.state.messages);

        let data = {};
        data.uid = this.state.uid;
        data.message = this.state.message;

        this.socket.emit('join', data);
        this.setState({ message: "" });

        console.log('messages after onSubmit', this.state.messages);
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
        // console.log("ChatView onChange new state: ", this.state.message);
    };

    render() {
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
                            title="Current Conversation"
                        />
                        <br/>
                        <br/>
                        <div className={classes.root}>
                        <div className="messages">
                            {this.props.summary ? (<p>{this.props.summary}</p>) : (<p>No Active Conversation</p>)}
                            {this.state.messages.map((message, index) => {
                                return(
                                    <Paper key={index} className={classes.paper}>
                                        <Grid container wrap="nowrap" spacing={16}>
                                            <Grid item>
                                                <Avatar>R</Avatar>
                                            </Grid>
                                            <Grid item xs zeroMinWidth>
                                                <Typography color='inherit' 
                                                    variant='h4' 
                                                    align='center' 
                                                    noWrap key={index}
                                                >
                                                    {message}
                                                </Typography>
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
                        <br/>
                        <RaisedButton
                                label="End Conversation"
                                secondary={true}
                                onClick={this.props.closeConvo}
                        />
                        
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


export default withStyles(styles)(ChatView);