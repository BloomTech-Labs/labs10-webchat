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
    overflowY: 'scroll',
    // height: '100vh',
  },
  convoList: {
    // overflowY: 'auto',
    height: '100vh',
  },
  paper: {
    height: 200,
    // width: '85%',
    // marrgin: 10,
    // maxWidth: 400,
    // margin: `${theme.spacing.unit}px auto`,
    // padding: theme.spacing.unit * 2,
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
          conversations: response.data  // .data should be an array of objects, each containing rep_name, rep_company_id, customer_uid, summary, customer_name
        });
      })
      .catch(error => {
        console.log(error.message);
      })
  }


    render() {
        const { classes } = this.props;

        return (

          <div className={classes.root}>
            <Typography
              variant='h4'
            >
              Closed Queues
            </Typography>
            <div className={classes.convoList}>
                {this.state.conversations.map((queue, index) => {

                  return (

                    <div className={classes.queueItem} key={index}>
                      <MuiThemeProvider> 
                        <Paper className={classes.paper}>
                          <Grid item
                            onClick={() => this.props.handleConvoSelect(queue.convo_id, queue.customer_uid, queue.summar, queue.customer_name)}
                          >
                            <h3 className={classes.queueTitle}>
                              {queue.customer_name}
                            </h3>
                            <h5 className={classes.queueSummary}>
                              {queue.summary}
                            </h5>
                         </Grid>
                        </Paper>
                      </MuiThemeProvider>

                    </div>

                  );
                })}
            </div>
          </div>

        ); 
      }
    } 
    
export default withStyles(styles)(withRouter(Convos));

