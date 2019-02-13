import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import SettingsNavigation from './components/settings/SettingsNavigation';
import Navigation from './components/Navigation';

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navigation />
        <div className="settings-container">
          <SettingsNavigation />
        </div>
      </div>
    );
  }
}

export default App;
