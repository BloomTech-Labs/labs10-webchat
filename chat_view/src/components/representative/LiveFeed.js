import React, { Component } from 'react';
import Query from './Query';
import QueryPanel from './QueryPanel';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class LiveFeed extends Component {
  state = {
    clickedQuery: false,
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


  showQuery(i) {
    console.log('Clicking Query', i);
    this.setState({ clickedQuery: !this.state.clickedQuery });
    console.log('this.state.clickedQuery:', this.state.clickedQuery);
  }

  render() {
    let links = this.state.queries.map((element, index) => {
      return (
        <li key={index}>
          <button onClick={(event) => this.showQuery(index) }>
            Query: {element}
          </button>
        </li>
      );
    });

    

    return(
      <div>
          <div>
            <ol>
              {links}
            </ol>
          </div>
          
        {/* {this.state.queryFeed.map((element, index) => {
          return <Query key={index} query={element} clickQuery={() => this.clickQuery} />
        })} */}
        {/* { this.state.clickedQuery ? (<QueryPanel />): (null)
        } */}
      </div>
    );
  }
}

export default LiveFeed;