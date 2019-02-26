import React from "react";
import io from "socket.io-client";

console.log(io);

class Dummy extends React.Component {
  state = {
    test: ""
  }

  // socket = io();

  
  render() {
    return(
      <div>
        TEST        
      </div>

    );
  }
}
export default Dummy;