import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'
import socket from 'socket.io-client';
import Query from './Query';
import QueryPanel from './QueryPanel';
import ChatRepPage from './ChatRepPage';
import './Query.css';
import axios from 'axios';


class LiveFeed extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rep_id: props.history.location.state.rep_id,	    
      currentQuery: null,
      queries: [1, 2, 3],
    }
    
    socket.on("send_data", function(data) {
      console.log("send_data");
      //let queries = this.state.queries;
      //queries.push(data);
      //this.setState({ queries });
      // or this.setState({ queries: [...this.state.queries, data] })
    });
  }
  
  componentDidMount() {
  const id = this.props.history.location.state.rep_id;	  
    const request = axios.get('/api/customers/company/:id');
	    request.then(response => {
			console.log('query: ', response.data);
                })
                .catch(error =>{
                        console.log(error.message);
                })	  
  }

  render() {
    let queries = this.state.queries.map((element, index) => {
      return (
        <Link key={index}>
          <Query query={"LOL"} />
        </Link>
      );
    });
    return(
      <Router>
        <div className="LiveFeed">
          <div className="Query">
            {queries}
          </div>
        </div>
        <div className="QueryPanel">
          <Route exact path="/" render={() => (
            loggedIn ? (
              <Chatroom to="/chat/:room_id"/>
            ) : (
              null
            )
          )}/>
        </div>
      </Router>

    );
  }
}

export default LiveFeed;
