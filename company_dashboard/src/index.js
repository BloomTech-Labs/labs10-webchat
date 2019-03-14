import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import Firebase, { FirebaseContext } from './components/Firebase';
import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://webchatlabs10.herokuapp.com'
    : 'http://localhost:5000';

ReactDOM.render(
	 <FirebaseContext.Provider value={new Firebase()}>
	 <Router>
	 <App />
	</Router>
	 </FirebaseContext.Provider>,
	 document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
