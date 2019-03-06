import React, { Component } from 'react';
import io from 'socket.io-client';
import { withFirebase } from "../Firebase";
import { withRouter} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
// import socket from 'socket.io-client';
// import Query from './Query';
// import QueryPanel from './QueryPanel';
// import ChatRepPage from './ChatRepPage';
import './Query.css';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';
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
});

const LiveFeedPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <LiveFeedComponent firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);

class LiveFeedFormBase extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rep_id: props.history.location.state.rep_id,	    
      currentQuery: null,
      error: null,	    
      queries: ["hello"],
      logged: false,	    
    }
  }

  componentDidMount() {
    	
	  this.props.firebase.auth.currentUser.getIdToken()
      .then(idToken => {
        console.log("idToken in livefeed page: ", idToken);
            
	      axios.defaults.headers.common['Authorization'] = idToken; 

	      console.log('rep_is is', this.props.history.location.state.rep_id);	
	      const id = this.props.history.location.state.rep_id;

	      //axios call to get all the customer questions to display on representative dashboard		  
	      const request = axios.get(`/api/customers/company/${id}`);
        request
          .then(response => {
            console.log('query: ', response.data);
			      this.setState({queries: response.data, logged: true});
          })
            .catch(error => {  // if error from get customer queries for company
            console.log(error.message);
          })
      })
	    .catch(error => {   // if error from getIdToken
	      console.log(error.message);	  
        this.setState({ error:error });
      })
  }  

  render() {
    const { classes } = this.props;
    return (
      <div>
        <MuiThemeProvider>    
          <Typography color='inherit' variant='h4' align='center'>Message Queue</Typography><br/><br/>     
            {this.state.queries.map((query, index) => {
              return(
                <Paper key={index} className={classes.paper}>
                  <Grid container wrap="nowrap" spacing={16}>
                    <Grid item>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Link to={`/chatreppage/${query.uid}`} key={index}>
                        <Typography 
                          color='primary' 
                          variant='h5' 
                          align='center' 
                          noWrap 
                          key={index}
                        >
                          Customer Question:{query.summary}
                        </Typography>
                      </Link>
                    </Grid>
                  </Grid>
                </Paper>
              )	 
            })}
        </MuiThemeProvider>      
      </div>
    );
  }
}

LiveFeedFormBase.propTypes = {     
  classes: PropTypes.object.isRequired,
};

const LiveFeedComponent = withStyles(styles)(withRouter(withFirebase(LiveFeedFormBase)));

export default LiveFeedPage;

export {LiveFeedComponent};

//ChatRepPage.propTypes = {
//  classes: PropTypes.object.isRequired,
//};

//export default withStyles(styles)(ChatRepPage);
