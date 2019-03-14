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
    listItem: {
        '&:hover': {
          cursor: 'pointer'
        }
    },
    convoAuthor: {
        'margin-block-start': '0px',
        'margin-block-end': '.8em'
    },
    convoSummary: {
        'margin-left': '.6em'
    }
});

class ClosedConvos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: []
        }
    }

    componentDidMount() {
        const getClosed = axios.get('/api/chat/closed')
        getClosed
            .then(closed => {
                this.setState({
                    conversations: closed.data  // active.data should be an array of objects, each containing rep_name, rep_company_id, customer_uid, summary, customer_name
                });
            })
            .catch(error => {
                console.log(error.message);
            })
    }


    render() {
        const { classes } = this.props;
        return (
        <div>
            <MuiThemeProvider> 
            <div>   
            <Typography color='inherit' variant='h4' align='left'>Closed Conversations</Typography><br/><br/>     
                {this.state.conversations.map((convo, index) => {
                return(
                    <Paper key={index} className={classes.paper}>
                    <Grid container wrap="nowrap" className={classes.listItemContainer} spacing={0}>
                        <Grid item>
                        </Grid>
                        <Grid item
                            xs
                            zeroMinWidth
                            className={classes.listItem}
                            key={index}
                            onClick={() => this.props.handleClosedConvoSelect(convo.convo_id, convo.customer_uid, convo.summary, convo.customer_name)}
                        >
                            <Typography
                                color='primary'
                                variant='h5'
                                align='left'
                                noWrap
                                key={index}
                            >
                                <h3 className={classes.convoAuthor}>{convo.customer_name}</h3>
                            
                                <body2 className={classes.convoSummary}>    {convo.summary}</body2>
                            </Typography>

                        </Grid>
                    </Grid>
                    </Paper>
                )
                })}
                </div>
            </MuiThemeProvider>
        </div>
        );

    }
}

export default withStyles(styles)(withRouter(ClosedConvos));
