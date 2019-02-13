import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SettingsNavigation from './components/settings/SettingsNavigation';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SettingsNavigation />
      </div>
    );
  }
}

export default App;
