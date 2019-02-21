import React, { Component } from 'react';
import Chat from './components/Chat';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to Customer Service, how can we help?  
        </header>
        <Chat />
      </div>
    );
  }
}

export default App;
