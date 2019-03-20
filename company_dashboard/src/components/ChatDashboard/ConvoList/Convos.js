import React, { Component } from 'react';
import io from 'socket.io-client';
import { withRouter} from "react-router-dom"
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { ThemeProvider, MessageList, MessageGroup, MessageText, MessageTitle, Message, AgentBar, Row } from '@livechat/ui-kit';


const styles = theme => ({
  root: {
    border: '1px dotted black',
    marginBottom: 300,
    // overflowY: 'scroll',
    // height: '100vh',
  },
  convoList: {
    overflowY: 'scroll',
    height: '100vh',
  },
  paper: {
    height: 100,
    textAlign: 'left',
    padding: theme.spacing.unit,
    borderRadius: '0px',
    border: '0.2px solid grey',
    // width: '85%',
    // marrgin: 10,
    // maxWidth: 400,
    // margin: `${theme.spacing.unit}px auto`,
    
  },
  queueItem: {
    // padding: theme.spacing.unit * 2,
    // height: 250,
    // width: '100%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  queueTitle: {
    positioin: 'absolute',
    right: 20,
    top: 20
  },
  queueSummary: {

  },
  listFooter: {
    height: '100px'
  }
});

class Convos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    }
  }

  componentDidMount() {
    const getClosed = axios.get(`/api/chat/${this.props.convoStatus}`);
    getClosed
      .then(response => {
        this.setState({
          conversations: response.data  
        });
      })
      .catch(error => {
        console.log(error.message);
      })
  }

  componentWillReceiveProps(newProps) {
    if (newProps.currentConvoClosed !== this.props.currentConvoClosed) {
      console.log('Convos currentConvoClosed changed');
      const getClosed = axios.get(`/api/chat/${this.props.convoStatus}`);
      getClosed
        .then(response => {
          this.setState({
            conversations: response.data  
          });
        })
        .catch(error => {
          console.log(error.message);
        })
    }
  }

    render() {
        const { classes } = this.props;

        return (
          <div className={classes.root}>
            <Typography
              variant='h4'
            >
            </Typography>
            <div className={classes.convoList}>
                {this.state.conversations.map((convo, index) => {

                  return (
                    <div className={classes.queueItem} key={index}>
                      <MuiThemeProvider> 
                        <Paper 
                          className={classes.paper}
                          style={{ backgroundColor: this.props.currentConvoId === convo.convo_id ? '#AAAAAA' : 'white' }}
                          onClick={() => this.props.handleConvoSelect(convo.convo_id, convo.customer_uid, convo.summary, convo.customer_name)}
                        >
                          {/* <Grid item
                            onClick={() => this.props.handleConvoSelect(convo.convo_id, convo.customer_uid, convo.summary, convo.customer_name)}
                          > */}
                            <h3 className={classes.queueTitle}>
                              {convo.customer_name}
                            </h3>
                            <h5 className={classes.queueSummary}>
                              {convo.summary}
                            </h5>
                         {/* </Grid> */}
                        </Paper>
                      </MuiThemeProvider>
                    </div>
                  );
                })}
                <div className={classes.listFooter}>
                  <p>End of list</p>
                </div>
            </div>
          </div>

        ); 
      }
    } 
    
export default withStyles(styles)(Convos);

