import React, { Component } from 'react';
import Query from './Query';
import QueryPanel from './QueryPanel';
import './Query.css';

class LiveFeed extends Component {
  state = {
    clickedQuery: false,
    currentQuery: null,
    queries: [1, 2, 3]
  }
    
    componentDidMount() {
      let data = [36, 62, 24];
        
      this.setState({ queries: data })
      console.log(this.state.queries);
      // on.emit("get_queries", function(data) {
        
      //   this.setState(queries: data)
      // })
    }
  // io.on("incoming_queries", function(data) {
  // 
  // 
  // Update statequeryFeed with io's
  // });

  // componentDidMount
  // sock.on(fldkfas, function(data) {
  //  this.setState(queryfeed: data.uuid )
  // })


  openQuery = (query) => {
    this.setState({ clickedQuery: !this.state.clickedQuery });
    console.log('clickedQuery State: ', this.state.clickedQuery);
    this.setState({ currentQuery: query});
  }

  render() {
    let links = this.state.queries.map((element, index) => {
      return (
        <Query key={index} uuid={element} openQuery={this.openQuery} />
      );
    });

    return(
      <div className="LiveFeed">
        <div className="Query">
          {links}
        </div>
        <div className="QueryPanel">
        {/* How do i make this querypanel dynamic? I need to add the states uuid here */}
          { this.state.clickedQuery ? <QueryPanel uuid={this.state.currentQuery}/> : null }
        </div>
      </div>
    );
  }
}

export default LiveFeed;