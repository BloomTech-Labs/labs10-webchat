import React, { Component } from "react";
import "./App.css";

// import LandingPage from './components/LandingPage';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <LandingPage />
//       </div>
//     );
//   }
// }

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
