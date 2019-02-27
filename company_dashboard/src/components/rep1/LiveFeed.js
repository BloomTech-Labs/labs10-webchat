import React, { Component } from 'react';
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
      clickedQuery: false,
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
  
  

  openQuery = (query) => {
    this.setState({ clickedQuery: !this.state.clickedQuery });
    console.log('clickedQuery State: ', this.state.clickedQuery);
    this.setState({ currentQuery: query});
  }

  render() {
    let queries = this.state.queries.map((element, index) => {
      return (
        <Query key={index} uuid={element} openQuery={this.openQuery} />
      );
    });

    return(
      <div className="LiveFeed">
        <div className="Query">
          {queries}
        </div>
        <div className="QueryPanel">
        {/* How do i make this querypanel dynamic? I need to add the states uuid here */}
          {/* { this.state.clickedQuery ? <QueryPanel uuid={this.state.currentQuery}/> : null } */}
          { this.state.clickedQuery ? <ChatRepPage /> : null }
        </div>
      </div>
    );
  }
}

export default LiveFeed;
