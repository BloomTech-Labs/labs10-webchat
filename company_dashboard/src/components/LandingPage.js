import React, { Component } from "react";
import "./LandingPage.css";
import { Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';

import Button from "@material-ui/core/Button";

class LandingPage extends Component {
  render() {
    return (
      <div className="landing-page">
        <div className="navigation-container">
	  <Link to={ROUTES.REP_REGISTER}>Sign Up</Link>  
	  <img className="netlify-logo" src={require("./images/logomark.png")} alt="Netlify logo" />
        </div>
        <div className="landing-info">
          <h1>Web Chat</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            nulla tellus, pellentesque eu justo ac, mollis auctor enim. Donec
            luctus scelerisque pharetra. Morbi accumsan porttitor tortor, non
            elementum mauris faucibus a. Mauris enim arcu, sagittis a tortor at,
            tincidunt consectetur ex. In vitae varius nisi, a elementum eros.
            Nulla dapibus eleifend neque, volutpat suscipit massa viverra nec.
            Donec quis sodales lorem, sed facilisis magna. Vivamus scelerisque
            at enim tempus tincidunt. In fermentum rutrum tempus. Ut a odio eu
            diam cursus hendrerit. Etiam nisi mi, fringilla ut risus vel, ornare
            molestie mi. Etiam elementum nunc ex, a venenatis ligula dictum ut.
            Vivamus sit amet ipsum a neque pellentesque sodales.
          </p>
          <Button variant="outlined" color="primary" className="upload-button">
            Get Started
          </Button>
        </div>
      </div>
    );
  }
}

export default LandingPage;
