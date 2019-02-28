import React, { Component } from 'react';
import io from 'socket.io-client';
import { withFirebase } from "../Firebase";
import { Link, withRouter, Route} from "react-router-dom"
import { FirebaseContext } from '../Firebase';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom'
import socket from 'socket.io-client';
import Query from './Query';
import QueryPanel from './QueryPanel';
import ChatRepPage from './ChatRepPage';
import './Query.css';
import axios from 'axios';



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
      queries: [1, 2, 3],
    }
   
	  
  }

  componentDidMount() {
    	
	this.props.firebase.auth.currentUser.getIdToken()
          .then(idToken => {
            console.log("idToken in livefeed page: ", idToken);
            
	    axios.defaults.headers.common['Authorization'] = idToken; 

	    console.log('rep_is is', this.props.history.location.state.rep_id);	
	     const id = this.props.history.location.state.rep_id;	  
	     const request = axios.get(`/api/customers/company/${id}`);

                request.then(response => {
                        console.log('query: ', response.data);
                })
                .catch(err =>{
                        console.log(err.message);
                })

	  })
	  .catch(error => {
	    console.log(error.message);	  
            this.setState({ error:error });
          })
	  
}  

  openQuery = (query) => {
    this.setState({ clickedQuery: !this.state.clickedQuery });
    console.log('clickedQuery State: ', this.state.clickedQuery);
    this.setState({ currentQuery: query});
  }

  render() {
    let queries = this.state.queries.map((element, index) => {
      return (
        <div className="Query">
          <Link to={element.uid} key={index}>
            <Query query={"drop query props here"} />
          </Link>
        </div>
      );
    });
    return(
      <Router>
        <div className="LiveFeed">
          <div className="Queries">
            {queries}
          </div>
        </div>
        <div className="QueryPanel">
          <Route exact path="/" render={() => (
            substitute ? (
              <Redirect to="/chat/:room_id"/>
            ) : (
              null
            )
          )}/>
        </div>
      </Router>

    );
  }
}

const LiveFeedComponent = withRouter(withFirebase(LiveFeedFormBase));

export default LiveFeedPage;

export {LiveFeedComponent};


