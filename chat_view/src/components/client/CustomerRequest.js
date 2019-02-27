import React, { Component } from 'react';

class CustomerRequest extends Component {
    state = {
        email: "",
        name: "",
        question: ""
    }


    sendData() {
        console.log("sendData()")
    }

    render() {
        return(
            <div>
                <form onSubmit={this.sendData}}>
                    <input type="text" placeholder="What is your name"></input>
                    <input type="text" placeholder="Enter your email"></input>
                    <input type="text" placeholder="Enter your question"></input>
                </form>
            </div>
        );
    }
};

export default CustomerRequest;